import delay from './delay';
import proxy from './modelProxy';
import _ from 'lodash';

export default async function (model, modelEmitter, params, PAGE_INIT_TIMEOUT) {
  let timer;
  let emitModel = {};

  if (typeof model === 'function') {
    model = {'_model': model}
  }
  let modelProxy = proxy(model, params);

  let modelPromises = Object.keys(modelProxy).map(key => {
    let promiseFunc = modelProxy[key];
    let promise = promiseFunc(params);
    if (typeof promise.then !== 'function') {
      promise = deepPromise(promise, params);
    }
    promise._key = key;
    promise.then(value => {
      promise._value = value;
      Object.defineProperty(model[key], '_value', {
        enumerable: false,
        value: value
      });
    });
    return promise;
  });

  modelPromises.forEach((promise) => {
    if (!promise._value) {
      promise.then(result => {
        emitModel[promise._key] = result;
        clearTimeout(timer);
        timer = setTimeout(modelEmitter.emit.bind(modelEmitter, 'model', emitModel), 0);
      });
    } else {
      emitModel[promise._key] = promise._value;
    }
  });

  await Promise.race([delay(PAGE_INIT_TIMEOUT), Promise.all(modelPromises)]).then(value => {
    if (value) {
      modelEmitter.emit('model', emitModel);
    }
  });

  Promise.all(modelPromises).then(values => modelEmitter.emit('end', emitModel));
};

function deepPromise(obj, params) {
  return new Promise((resolve, reject) => {
    if (_.isPlainObject(obj)) {
      let promises = objectToPromises(obj, params);
      Promise.all(Object.values(promises)).then((values)=>{
        let result = {};
        Object.keys(promises).map((key, i) => {
          result[key] = values[i];
        })
        resolve(result);
      });
    } else {
      resolve(obj);
    }
  });
}

function objectToPromises(obj, params) {
  let promises = {};
  Object.keys(obj).map(key => {
    let value = obj[key];
    if (typeof value === 'function') {
      value = value(params);
    }
    if (typeof value.then !== 'function') {
      value = (value => new Promise(resolve => resolve(value)))(value);
    }
    promises[key] = value;
  });
  return promises;
}
