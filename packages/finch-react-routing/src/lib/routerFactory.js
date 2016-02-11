import {Router} from 'react-routing';
import React, {
  Component,
  PropTypes,
} from 'react';

export default function (routes) {
  let computedRoutes = {};

  let router = new Router((on) => {
    addRoutes('/', routes, computedRoutes, on);
  });
  router.computedRoutes = computedRoutes;
  return router;
}

function addRoutes(path, routes, computedRoutes, callback) {
  if (!routes) {
    return;
  }
  for (let key of Object.keys(routes)) {
    let pagePath = '/' + (path + '/' + key).split('/').filter(path=>path).join('/');
    if (path == '/' && key == 'error') {
      pagePath = key;
    }
    let Component = routes[key];
    computedRoutes[pagePath] = Component;
    console.log('Register page ' + pagePath);
    callback(pagePath, async (state, next)=> {
      return Component;
    });
    addRoutes(pagePath, Component.pages, computedRoutes, callback);
  }
}
