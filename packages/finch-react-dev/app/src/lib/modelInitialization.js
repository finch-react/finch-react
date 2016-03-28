import { delay, toPromise } from 'finch-react-core'
import proxy from './modelProxy';
import { Readable } from 'stream';

export default async function (model, params, PAGE_INIT_TIMEOUT) {
  let timer;
  let emitModel = {};

  let stream = Readable({ objectMode: true });
      stream._read = function(){};

  if (typeof model === 'function') {
    model = {'_model': model}
  }

  let modelProxy = proxy(model, params);
  let modelPromises = Object.keys(modelProxy).map(key => {
    let promiseFunc = modelProxy[key];
    let promise = toPromise(promiseFunc(params), params);
    promise._key = key;
    promise.then(value => {
      Object.defineProperty(Object(model[key]), '_value', {
        enumerable: false,
        writable: true,
        value: value
      });
    });
    return promise;
  });

  let resolved;
  modelPromises.forEach((promise) => {
    if (!promise._value) {
      promise.then(result => {
        emitModel[promise._key] = result;
        stream.push(emitModel);
      });
    } else {
      emitModel[promise._key] = promise._value;
      resolved = true;
    }
  });
  if (resolved) {
    stream.push(emitModel);
  }

  await Promise.race([delay(PAGE_INIT_TIMEOUT), Promise.all(modelPromises)]).then(values => {
    if (values) {
      stream.push(emitModel);
      stream.push(null);
    } else {
      Promise.all(modelPromises).then(values => {
        stream.push(emitModel);
        stream.push(null);
      });
    }
  });

  return stream;
};
