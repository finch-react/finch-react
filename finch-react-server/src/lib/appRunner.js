import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import WithContext from '../components/WithContext';
import path from 'path';
import express from 'express';

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
  server.get('*', async (req, res, next) => {
    try {
      let statusCode = 200;
      let styles = {};
      let context = {
        onServerStyle(style) {
          styles[style._id] = style;
        }
      };
      let initFluxPromise = null;
      var body = ReactDOMServer.renderToStaticMarkup(<WithContext context={context}><RootComponent /></WithContext>);
      res.status(statusCode);
      res.write(htmlHeader({
        css: Object.keys(styles)
          .map(name=>styles[name].toString())
          .join(''),
        body
      }));
      if (initFluxPromise != null) {
        await initFluxPromise;
      }
      res.end(htmlFooter());
    } catch (err) {
      console.err(err);
      next(err);
    }
  });
  server.listen(server.get('port'), () => {
    console.log('The server is running at http://localhost:' + server.get('port'));
  });
}

function htmlHeader({css, body}) {
  return `<!doctype html><html className="no-js" lang="">
<head><style>${css}</style></head>
<body>
<script>
var script = document.createElement("script");
script.src = '/public/bundle.js';
document.body.appendChild(script);
</script>
<div id="app">${body}`;
}

function htmlFooter({}) {
  return `</div><script type="text/javascript"></script></html>`;
}
