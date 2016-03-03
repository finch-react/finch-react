import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function pullHydrate(callback) {
  if (canUseDOM) {
    let hydrate = document.getElementById('hydrate');
    let innerHTML = hydrate.innerHTML;

    if (innerHTML.length > 0 && innerHTML.length !== pullHydrate.hydrateLength) {
      pullHydrate.hydrateLength = innerHTML.length;
      let model = {};
      innerHTML.split('/n/t').forEach(json => {
        if (json) {
          Object.assign(model, JSON.parse(json));
        }
      });
      if (!pullHydrate.hydrateEnd && Object.keys(model).length > 0) {
        pullHydrate.hydrateEnd = 'end' in model;
        callback(model);
      }
    }

    if (!pullHydrate.hydrateEnd) {
      setTimeout(pullHydrate.bind(this, callback), 100);
    }
  }
}

pullHydrate.hydrateEnd = false;
pullHydrate.hydrateLength = 0;

export default pullHydrate;
