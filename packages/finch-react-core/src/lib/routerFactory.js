import {Router} from 'react-routing';
import React, {
  Component,
  PropTypes,
} from 'react';

export default function (routes, menuRoutes, contextRoot) {
  // Если передали два аргумента и второй строка, то не строим меню
  if (typeof menuRoutes === 'string') {
    contextRoot = menuRoutes;
    menuRoutes = null;
  }
  // Если нет contextRoot, то делаем его пустой строкой, чтобы не проверять при конкатенации
  if (!contextRoot) {
    contextRoot = '';
  }

  let registeredRoutes = {};
  let navigation = [];
  let computedRoutesTree = [];

  let router = new Router((on) => {
    addRoutes(`${contextRoot}/`, routes, registeredRoutes, on);
    addMenuRoutes(`${contextRoot}/`, menuRoutes, registeredRoutes, navigation, on);
    injectUrl(registeredRoutes);
  });

  Object.defineProperty(router, 'computedRoutes', {
    get: function () {
      console.log("Somebody wants to read router.computedRoutes");
      return registeredRoutes;
    }
  });

  Object.defineProperty(router, 'navigation', {
    get: function () {
      console.log("Somebody wants to read router.navigation");
      return navigation;
    }
  });

  router.computedRoutesTree = computedRoutesTree;
  router.ref = ref;
  return router;
}

function addRoutes(path, routes, registeredRoutes, callback, parent) {
  if (!routes) {
    return;
  }
  Object.keys(routes).map((key)=>{
    let pagePath;
    if (key === 'error') {
      pagePath = key;
    } else {
      pagePath = '/' + (path + '/' + key).split('/').filter(path=>path).join('/');
    }
    let Component = routes[key];
    Component = getComponentClazz(Component);
    registeredRoutes[pagePath] = Component;
    if (parent) {
      Object.defineProperty(Component, '_parent', {
        value: parent
      });
    }
    // if (key !== 'error') {
    //   computedRoutesTree.push(Component);
    //   let c = getComponentClazz(Component);
    //   if (!Component._key) {
    //     Object.defineProperty(c, "_key", {
    //       value: key
    //     });
    //   }
    //   Object.defineProperties(c, {
    //     "_parent": {
    //       value: parent
    //     },
    //     "_children": {
    //       value: childrenRoutes
    //     }
    //   })
    // }
    callback(pagePath, async (state, next) => {
      return Component;
    });
    console.log('Register route ' + pagePath);
    if (Component.pages) {
      addRoutes(pagePath, Component.pages, registeredRoutes, callback, Component);
    }
    if (Component.menu) {
      let navigation = [];
      Object.defineProperty(Component, '_menu', {
        value: navigation
      });
      addMenuRoutes(pagePath, Component.menu, registeredRoutes, navigation, callback, Component);
    }
  });
}

function addMenuRoutes(path, menuRoutes, registeredRoutes, navigation, callback, parent) {
  if (!menuRoutes) {
    return;
  }
  menuRoutes.map((route)=>{
    let { url, component, title } = route;
    let Component = getComponentClazz(component);
    if (!Component) {
      navigation.push({
        url,
        title
      });
      return;
    }
    let pagePath = '/' + (path + '/' + url).split('/').filter(path=>path).join('/');
    registeredRoutes[pagePath] = Component;
    callback(pagePath, async (state, next) => {
      return Component;
    });
    navigation.push({
      component,
      title
    });
    if (parent) {
      Object.defineProperty(Component, '_parent', {
        value: parent
      });
    }
    console.log('Register menu item ' + pagePath + ' as ' + (title || url));
    if (Component.pages) {
      addRoutes(pagePath, Component.pages, registeredRoutes, callback, Component);
    }
    if (Component.menu) {
      let subMenu = [];
      Object.defineProperty(Component, '_menu', {
        value: subMenu
      });
      addMenuRoutes(pagePath, Component.menu, registeredRoutes, subMenu, callback, Component);
    }
  });
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

    Object.defineProperty(getComponentClazz(clazz), '_url', {
      value: url
    });
  });
  return routes;
}

function getComponentClazz(component) {
  //legacy for babel6 module system
  return (component && 'default' in component) ? component['default'] : component;
}
