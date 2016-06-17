import {Router} from 'react-routing';
import React, {
  Component,
  PropTypes,
} from 'react';

export default function (routes, contextRoot) {
  let computedRoutes = {};

  let router = new Router((on) => {
    addRoutes(contextRoot ? `${contextRoot}/` : '/', routes, computedRoutes, on);
  });
  router.computedRoutes = injectUrl(computedRoutes);
  router.ref = ref;
  return router;
}

function addRoutes(path, routes, computedRoutes, callback) {
  if (!routes) {
    return;
  }
  for (let key of Object.keys(routes)) {
    let pagePath = '/' + (path + '/' + key).split('/').filter(path=>path).join('/');
    if (key === 'error') {
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

function ref(clazz, params) {
  if (!clazz._url) {
    console.error("Page " + clazz.name + " is not registered in router");
    return null;
  }
  let split = clazz._url.split('/');
  let url = [];
  for (let i = 0; i < split.length; i++) {
    let chunk = split[i];
    if (chunk.indexOf(':') !== 0) {
      url.push(chunk);
      continue;
    }
    let paramName = chunk.replace(':', '').replace('?', '');
    let param = params[paramName];
    if (typeof param === 'undefined' && chunk.indexOf('?') !== chunk.length - 1) {
      console.error("Missing required url-parameter '" + paramName + "'.\nUrl-expression is '" + clazz._url + "' and given params are " + JSON.stringify(params));
      return null;
    } else if (typeof param !== 'undefined') {
      url.push(param);
    } else {
      break;
    }
  }
  return url.join('/');
}

function injectUrl(routes) {
  Object.keys(routes).forEach(url => {
    let clazz = routes[url];

    //legacy for babel6 module system
    clazz = 'default' in clazz ? clazz['default'] : clazz;
    Object.defineProperty(clazz, '_url', {
      value: url
    });
  });
  return routes;
}
