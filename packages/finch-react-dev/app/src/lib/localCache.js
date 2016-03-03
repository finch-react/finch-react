import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function checkLocalCache() {
  if (canUseDOM && 'localStorage' in window) {
    let model;
    try {
      model = JSON.parse(localStorage.getItem(document.location.href + '_model'));
    } catch (e) {

    } finally {
      return model;
    }
  }
}

function storeLocalCache (model) {
  if (canUseDOM && 'localStorage' in window) {
    return localStorage.setItem(document.location.href + '_model', JSON.stringify(model));
  }
}

export default {
  check: checkLocalCache,
  store: storeLocalCache
};
