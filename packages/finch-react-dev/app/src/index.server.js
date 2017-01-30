
import {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import express from 'express';
import normalize from 'normalize.css';
import uuid from 'uuid';
import {routerFactory, Location} from 'finch-react-core';
import router from './router';

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

server.get('*', async(req, res, next) => {
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

    let routedComponent = null;
    let modelPromise = null;
    let RoutedComponent = null;
    await router.dispatch({path: req.path, context}, (state, Component) => {
      RoutedComponent = require(`./pages/${Component.type}/index.js`);
      Object.assign(RoutedComponent, Component);
      modelPromise = RoutedComponent.model(state.params);
      routedComponent = (
        <RoutedComponent modelPromise={modelPromise} context={context} request={state} />
      );
    });
    if (routedComponent == null) {
      return next();
    }
    modelPromise.then(r=>modelPromise._value=r);
    await modelPromise;
    let body = ReactDOMServer.renderToStaticMarkup(routedComponent);
    res.write(htmlHeader({
      css: Object.keys(styles)
        .map(name => styles[name].toString())
        .join(''),
      body: body
    }));
    res.end(htmlFooter());
  } catch (err) {
    console.log(err);
    next(err);
  }
});
server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});


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
        if(!document.location.search.includes("nojs")){
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
