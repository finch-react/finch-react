import delay from './delay';
import proxy from './modelProxy';

export default async function (model, modelEmitter, params, PAGE_INIT_TIMEOUT) {
  let timer;
  let emitModel = {};
  let modelProxy = proxy(model, params);

  let modelPromises = Object.keys(modelProxy).map(key => {
    let promiseFunc = modelProxy[key];
    let promise = promiseFunc(params);
    promise._key = key;
    promise.then(value => promise._value = value);
    return promise;
  });

  modelPromises.forEach((promise) => {
    if (!promise._value) {
      promise.then(result => {
        emitModel[promise._key] = result;
        clearTimeout(timer);
        console.log('emit model', promise.key, emitModel);
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
