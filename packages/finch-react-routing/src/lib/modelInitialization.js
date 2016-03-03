import delay from './delay';
import proxy from './modelProxy';
import toPromise from './toPromise';

export default async function (model, modelEmitter, params, PAGE_INIT_TIMEOUT) {
  let timer;
  let emitModel = {};

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

  await Promise.race([delay(PAGE_INIT_TIMEOUT), Promise.all(modelPromises)]).then(values => {
    if (values) {
      modelEmitter.emit('model', emitModel);
    }
  });

  Promise.all(modelPromises).then(values => modelEmitter.emit('end', emitModel));
};
