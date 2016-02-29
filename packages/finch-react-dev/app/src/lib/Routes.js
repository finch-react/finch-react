export default class Routes {
  constructor(routes) {

    Object.keys(routes).forEach(url => {
      let clazz = routes[url];

      Object.defineProperty(clazz, '_url', {
        value: url
      });

      Object.defineProperty(this, url, {
        enumerable: true,
        writable: false,
        value: clazz
      });
    });
  }

  ref(clazz, params) {
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
}
