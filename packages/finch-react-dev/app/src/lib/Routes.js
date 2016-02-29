let data = {};

export default class Routes {
  constructor(routes) {

    Object.keys(routes).forEach(url => {
      let page = routes[url];
      let clazz = require('../pages/' + page);

      data[page] = { url, page };

      Object.defineProperty(this, url, {
        enumerable: true,
        writable: false,
        value: clazz
      });
    });
  }

  ref(page, params) {
    let route = data[page];
    let split = route.url.split('/');
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
        console.error("Missing required url-parameter '" + paramName + "' for page '" + page + "'.\nUrl-expression is '" + route.url + "' and given params are " + JSON.stringify(params));
        return null;
      } else if (typeof param !== 'undefined') {
        url.push(param);
      } else {
        break;
      }
    }
    return url.join('/');
  }
}
