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
  });

  Object.defineProperty(router, 'computedRoutes', {
    get: function () {
      return registeredRoutes;
    }
  });

  Object.defineProperty(router, 'navigation', {
    get: function () {
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
    let Component = {};
    const currentRoute = routes[key];
    const currentRouteName =  typeof currentRoute === "string" ? currentRoute : currentRoute['name'];

    if (key === 'error') {
      pagePath = key;
    } else {
      pagePath = '/' + (path + '/' + key).split('/').filter(path=>path).join('/');
    }

    Component.name = currentRouteName;
    Component.params = currentRoute.params || undefined;
    Component.renderer = currentRoute.renderer || currentRouteName;

    registeredRoutes[pagePath] = Component;

    callback(pagePath, async (state, next) => {
      if(pagePath === "error"){
        if(state.statusCode === 404) {
          return {
            name: "Page404",
            params: undefined,
            renderer: "Page404"
          }
        }
        else {
          return {
            name: "Page404",
            params: undefined,
            renderer: "Page500"
          }
        }
      }
      return Component;
    });
  });
}

function ref(name, params) {
  const routes = params.routes;

  let routesClone = {...routes};
  let routesMap = {};
  Object.keys(routesClone).forEach((k) => {
    if (typeof routesClone[k] === 'string') {
      routesClone[k] = {name: routesClone[k]};
    }
    routesClone[k].url = k;
    routesMap[routesClone[k].name] = routesMap[routesClone[k].name] || [];
    routesMap[routesClone[k].name].push(routesClone[k]);
  });

  let mask = false;
  Object.keys(routesMap).forEach(key => {
    let route = routesMap[key];
    route.forEach(item => {
      if(mask){
        return
      }
      if(item.name !== name){
        return
      }
      if(item.name === name && !item.params){
        mask = item.url
      }
      else {
        Object.keys(item.params).forEach(param => {
          if(item.params[param] === params.params[param]){
            mask = item.url
          }
        })
      }
    });
  });

  // const mask = Object.keys(routes).filter(key => {
  //   let isCoincided = true;
  //   let route = routes[key];
  //   let rendererName = Object.keys(routes[key])[0];
  //   let rendererArray = route[rendererName];
  //   if(rendererName == name){
  //     if(rendererArray.params === {}){
  //       return true
  //     }
  //     rendererArray.map(item => {
  //       let itemParams = item.params;
  //       Object.keys(itemParams).map(param => {
  //         if(itemParams[param] !==  params.params[param]){
  //           isCoincided = false;
  //         }
  //       });
  //     });
  //     return isCoincided
  //
  //   }
  //   else return false
  // });

  if(mask){
    let split = mask.split('/');
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
        console.error("Missing required url-parameter '" + paramName + "'.\nUrl-expression is '" + mask + "' and given params are " + JSON.stringify(params));
        return null;
      } else if (typeof param !== 'undefined') {
        url.push(param);
      } else {
        break;
      }
    }
    return url.join('/');
  }
  else return "/"

}
