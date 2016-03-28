import _ from 'lodash';

function toPromise(obj, params = {}, depth = Number.MAX_SAFE_INTEGER) {
  if (depth === 0) {
    return new Promise(resolve => resolve(obj));
  }

  let promise;
  if (obj && typeof obj.then === 'function') {
    promise = obj;
  } else if (_.isFunction(obj)) {
    promise = functionToPromise(obj, params, depth);
  } else if (_.isArrayLike(obj)) {
    promise = arrayToPromise(obj, params, depth);
  } else if (Object.keys(obj).length > 0) {
    promise = objectToPromise(obj, params, depth);
  } else {
    promise = toPromise(obj, params, 0);
  }
  promise.then(value => Object.defineProperty(promise, '_value', {
    enumerable: false,
    writable: false,
    value: value
  }));
  return promise;
}

function objectToPromise(obj, params, depth) {
  let promises = {};
  Object.keys(obj).forEach((key) => {
    promises[key] = toPromise(obj[key], params, depth-1);
  });
  return new Promise((resolve, reject) => {
    Promise.all(Object.values(promises)).then(
      values => {
        let result = {};
        Object.keys(promises).forEach((key, i) => result[key] = values[i]);
        resolve(result);
      },
      err => reject(err)
    )
  });
}

function arrayToPromise(obj, params, depth) {
  return Promise.all(obj.map(promise => toPromise(promise, params, depth-1)));
}

function functionToPromise(obj, params, depth) {
  return toPromise(obj(params), params, depth-1);
}

export default toPromise;
