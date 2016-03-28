import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Readable } from 'stream';

function pullHydrate() {
  let modelStream = Readable({ objectMode: true });
  modelStream._read = function(){};

  if (canUseDOM) {
    let hydrate = document.getElementById('hydrate');
    if (!hydrate) {
      return null;
    }
    let innerHTML = hydrate.innerHTML;

    if (innerHTML.length > 0 && innerHTML.length !== pullHydrate.hydrateLength) {
      pullHydrate.hydrateLength = innerHTML.length;
      let model = {};
      innerHTML.split('\n\t').forEach(json => {
        if (json) {
          try {
            Object.assign(model, JSON.parse(json));
          } catch (e) {
            console.error(e);
          }
        }
      });
      if (!pullHydrate.hydrateEnd && Object.keys(model).length > 0) {
        pullHydrate.hydrateEnd = 'end' in model;
        modelStream.push(model);
      }
    }

    if (!pullHydrate.hydrateEnd) {
      setTimeout(pullHydrate, 100);
    } else {
      hydrate.parentNode.removeChild(hydrate);
    }
  } else {
    return null;
  }

  return modelStream;
}

pullHydrate.hydrateEnd = false;
pullHydrate.hydrateLength = 0;

export default pullHydrate;
