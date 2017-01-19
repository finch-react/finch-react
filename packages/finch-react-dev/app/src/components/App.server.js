import ReactDOMServer from 'react-dom/server';
import path from 'path';
import express from 'express';
import normalize from 'normalize.css';
import uuid from 'uuid';
import { routerFactory, delay, Location } from 'finch-react-core';
import modelInitialization from '../lib/modelInitialization';
import eventEmitterFactory from 'event-emitter';
import allOff from 'event-emitter/all-off';
import router from '../router';
import cache from '../lib/cache';

const PAGE_INIT_TIMEOUT = process.env.PAGE_INIT_TIMEOUT || 300;
const server = global.server = express();
const webBundle = path.resolve(process.env.WEB_BUNDLE);

server.set('port', (process.env.PORT || 5000));
server.get('/public/bundle.js', function (req, res, next) {
 req.url = req.url + '.gz';
 res.set('Content-Encoding', 'gzip');
 next();
});
server.use('/public', express.static(webBundle));
server.use('/favicon.ico', express.static(webBundle));

export default function ServerAppRunner() {
  server.get('*', async (req, res, next) => {
    try {
      let statusCode = 200;
      let styles = {
        normalize: normalize
      };
      let context = {
        onServerStyle(style) {
          if (!style.id) {
            style.id = uuid.v1();
          }
          styles[style.id] = style;

        }
      };

      let routedState;
      let routedComponent;
      let modelEmitter = eventEmitterFactory({});
      modelEmitter._model = {};
      await router.dispatch({path: req.path, context}, (state, RoutedComponent) => {
        routedState = state;
        routedComponent = <RoutedComponent modelEmitter={modelEmitter} context={context} {...Object.assign({state}, state.params)} />;
      });
      if (routedComponent == null) {
        return next();
      }

      if (routedComponent.type.model) {
        let cachedModel = (await cache.getItem(req.path));
        if (cachedModel) {
          modelEmitter._model = {...modelEmitter._model, ...cachedModel};
          modelEmitter.emit('model', cachedModel);
        }

        let modelStream = (await modelInitialization(routedComponent.type.model, routedState.params, PAGE_INIT_TIMEOUT));
        modelStream.on('data', modelEmitter.emit.bind(modelEmitter, 'model'));
        modelStream.on('end',  modelEmitter.emit.bind(modelEmitter, 'end'));
      }

      writeModel(req, res, statusCode, styles, routedComponent, modelEmitter);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
  server.listen(server.get('port'), () => {
    console.log('The server is running at http://localhost:' + server.get('port'));
  });
}

function writeModel(req, res, statusCode, styles, routedComponent, modelEmitter) {
  res.status(statusCode);
  let resultModel = {};
  let onModel;
  let onEnd;

  if (req.accepts('html')) {
    let body = ReactDOMServer.renderToStaticMarkup(routedComponent);
    res.write(htmlHeader({
      css: Object.keys(styles)
        .map(name=>styles[name].toString())
        .join(''),
      body: body
    }));
    res.write("<div id='hydrate' style='display:none'>");
    onModel = model => {
      res.write(JSON.stringify(model) + '\n\t');
    };
    onEnd = _ => {
      allOff(modelEmitter);
      resultModel['end'] = true;
      res.write(JSON.stringify(resultModel) + '\n\t');
      res.end("</div>" + htmlFooter());
    };
  } else if (req.accepts('application/jsonstream')) {
    console.log('application/jsonstream');
    onModel = model => {
      console.log('model');
      res.write(JSON.stringify(model));
    };
    onEnd = _ => {
      allOff(modelEmitter);
      console.log('end');
      res.end();
    };
  } else if (req.accepts('application/json')) {
    console.log('application/json');
    onModel = model => {
      resultModel = {...resultModel, ...model};
    };
    onEnd = _ => {
      allOff(modelEmitter);
      res.end(JSON.stringify(resultModel));
    };
  }

  modelEmitter.on('model', model => {
    resultModel = {...resultModel, ...model};
    onModel(model);
  });
  modelEmitter.on('end', _ => {
    onEnd();
    cache.setItem(req.path, resultModel);
  });
};

function htmlHeader({css, body}) {
  return `
    <!doctype html><html className="no-js" lang="">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
      <style id="server-style">${css}</style>
    </head>
    <body>
      <script>
        if(document.location.search.substr(1) !== "server=true"){
          var script = document.createElement("script");
          script.src = '/public/bundle.js';
          document.body.appendChild(script);
        }
      </script>
      <div id="app">${body}</div>
  `;
}

function htmlFooter() {
  return `
      </body>
    </html>
  `;
}
