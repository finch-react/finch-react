import React from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import fonts from '../fonts/PTSansWeb/PTS55F_stylesheet.css';
import {WithContext, routerFactory, delay, Location, modelInitialization} from 'finch-react-routing';
import eventEmitterFactory from 'event-emitter';
import routes from '../routes';

const PAGE_INIT_TIMEOUT = process.env.PAGE_INIT_TIMEOUT || 0;

export default function ClientAppRunner() {
  const router = routerFactory(routes);

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
    await modelInitialization(routedComponent.type.model, modelEmitter, state.params, PAGE_INIT_TIMEOUT);
  }

  ReactDOM.render(routedComponent, element);

  let serverstyle = document.getElementById("server-style");
  if (serverstyle) {
    serverstyle.parentNode.removeChild(serverstyle);
  }
  normalize.use();
  fonts.use();
}
