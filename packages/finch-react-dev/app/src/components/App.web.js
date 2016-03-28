import React from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import fonts from '../fonts/PTSansWeb/PTS55F_stylesheet.css';
import { routerFactory, delay, Location } from 'finch-react-core';
import WithContext from './WithContext';
import modelInitialization from '../lib/modelInitialization';
import eventEmitterFactory from 'event-emitter';
import router from '../router';
import cache from '../lib/cache';
import pullHydrate from '../lib/pullHydrate';
import fetch from '../lib/fetch';

const PAGE_INIT_TIMEOUT = process.env.PAGE_INIT_TIMEOUT || 0;
const __SERVER__ = 'http://localhost:5000';

export default function ClientAppRunner() {
  let currentLocation = null;
  let currentState = null;

  // Re-render the app when window.location changes
  const unlisten = Location.listen(location => {
    currentLocation = location;
    currentState = Object.assign({}, location.state, {
      path: location.pathname,
      query: location.query,
      state: location.state,
    });
    render(currentState, router);
  });
}

async function render(state, router) {
  let element = document.getElementById("app");
  if (!element) {
    element = document.createElement("div");
    element.setAttribute("id", "app");
    document.body.appendChild(element);
  }

  let routedComponent;
  let modelEmitter = eventEmitterFactory({});
  await router.dispatch(state, (_, RoutedComponent) => {
    routedComponent = <RoutedComponent modelEmitter={modelEmitter} {...Object.assign({state}, state.params)} />;
  });

  if (routedComponent.type.model) {
    let cachedModel = (await cache.getItem(state.path));
    if (cachedModel) {
      modelEmitter._model = {...modelEmitter._model, ...cachedModel};
      modelEmitter.emit('model', cachedModel);
    }

    let hydrateStream = pullHydrate();
    if (hydrateStream) {
      hydrateStream.on('data', modelEmitter.emit.bind(modelEmitter, 'model'));
      // hydrateStream.on('end',  modelEmitter.emit.bind(modelEmitter, 'end'));
    }

    if (__SERVER__ && !hydrateStream) {
      fetch(__SERVER__ + state.path, {
        headers: {
          // 'Accept': 'application/jsonstream,application/json'
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        modelEmitter.emit('model', json);
        modelEmitter.emit('end');
      });
      // }).then(response => {
      //   let reader = response.body.getReader();
      //   return reader.read();
      // })
      // .then(({value, done}) => {
      //   console.log(new TextDecoder('utf-8').decode(value));
      //   console.log(done);
      // });
    }
    // else {
    //   let modelStream = (await modelInitialization(routedComponent.type.model, state.params, PAGE_INIT_TIMEOUT));
    //   modelStream.on('data', modelEmitter.emit.bind(modelEmitter, 'model'));
    //   modelStream.on('end',  modelEmitter.emit.bind(modelEmitter, 'end'));
    // }
  }

  ReactDOM.render(routedComponent, element);

  {
    let resultModel = {};
    modelEmitter.on('model', model => {
      resultModel = {...resultModel, ...model};
    });
    modelEmitter.on('end', _ => {
      cache.setItem(state.path, resultModel);
    });
  }

  let serverstyle = document.getElementById("server-style");
  if (serverstyle) {
    serverstyle.parentNode.removeChild(serverstyle);
  }
  normalize.use();
  fonts.use();
}
