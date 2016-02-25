export default function(promises, params) {
  let promisesProxy = {};
  Object.keys(promises).forEach(key => {
    let invoked;
    let promiseFunc = promises[key];
    promisesProxy[key] = (params) => {
      if (!invoked) {
        if (typeof promiseFunc === 'function') {
          invoked = promiseFunc.call(promisesProxy, params);
        } else {
          invoked = promiseFunc;
        }
      }
      return invoked;
    }
  });
  Object.defineProperty(promisesProxy, '_params', {
    enumerable: false,
    value: params
  });
  return promisesProxy;
}
