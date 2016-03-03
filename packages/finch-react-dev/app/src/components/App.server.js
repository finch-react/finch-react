import ReactDOMServer from 'react-dom/server';
import path from 'path';
import express from 'express';
import normalize from 'normalize.css';
import uuid from 'uuid';
import {routerFactory, delay, Location, modelInitialization} from 'finch-react-routing';
import eventEmitterFactory from 'event-emitter';
import allOff from 'event-emitter/all-off';
import router from '../router';

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
        onServerStyle(id, style) {
          if (!id) {
            id = uuid.v1();
          }
          styles[id] = style;
        }
      };

      let routedState;
      let routedComponent;
      let modelEmitter = eventEmitterFactory({});
      await router.dispatch({path: req.path, context}, (state, RoutedComponent) => {
        routedState = state;
        routedComponent = <RoutedComponent modelEmitter={modelEmitter} context={context} {...Object.assign({state}, state.params)} />;
      });
      if (routedComponent == null) {
        return next();
      }

      if (routedComponent.type.model) {
        await modelInitialization(routedComponent.type.model, modelEmitter, routedState.params, PAGE_INIT_TIMEOUT);
      }

      if (req.accepts('html')) {
        res.status(statusCode);
        res.write(htmlHeader({
          css: Object.keys(styles)
            .map(name=>styles[name].toString())
            .join(''),
          body: ReactDOMServer.renderToStaticMarkup(routedComponent)
        }));
        res.write("<div id='hydrate' style='display:none'>");
        modelEmitter.on('model', model => {
          res.write(JSON.stringify(model) + '\n\t');
        });
        modelEmitter.on('end', model => {
          allOff(modelEmitter);
          model['end'] = true;
          res.write(JSON.stringify(model));
          res.end("</div>" + htmlFooter());
        });
        // res.end(htmlFooter());
      } else if (req.accepts('application/jsonstream')) {
        modelEmitter.on('model', model => {
          res.write(JSON.stringify(model));
        });
        modelEmitter.on('end', model => {
          allOff(modelEmitter);
          res.end();
        });
      } else if (req.accepts('application/json')) {
        modelEmitter.on('end', model => {
          allOff(modelEmitter);
          res.end(JSON.stringify(model));
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
  server.listen(server.get('port'), () => {
    console.log('The server is running at http://localhost:' + server.get('port'));
  });
}

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
        var script = document.createElement("script");
        script.src = '/public/bundle.js';
        document.body.appendChild(script);
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
