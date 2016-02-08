import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import WithContext from '../components/WithContext';
import path from 'path';
import express from 'express';
import normalize from 'normalize.css';
import uuid from 'uuid';

const PAGE_INIT_TIMEOUT = process.env.PAGE_INIT_TIMEOUT || 100;
const server = global.server = express();
const webBundle = path.resolve(process.env.WEB_BUNDLE);
server.set('port', (process.env.PORT || 5000));
server.get('/public/bundle.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
server.use('/public', express.static(webBundle));

export default function ServerAppRunner(RootComponent, initialProps, rootTag) {
  server.get('*', (req, res, next) => {
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

      //let initFluxPromise = null;
      var body = ReactDOMServer.renderToStaticMarkup(<WithContext context={context}><RootComponent /></WithContext>);
      res.status(statusCode);
      res.write(htmlHeader({
        css: Object.keys(styles)
          .map(name=>styles[name].toString())
          .join(''),
        body
      }));
      //if (initFluxPromise != null) {
      //  await initFluxPromise;
      //}
      res.end(htmlFooter());
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
      <div id="app">${body}
  `;
}

function htmlFooter() {
  return `
        </div>
      </body>
    </html>
  `;
}
