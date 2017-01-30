import {Component} from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import fonts from './fonts/PTSansWeb/PTS55F_stylesheet.css';
import {routerFactory, Location} from 'finch-react-core';
import router from './router';
import Preloader from './components/Preloader'

const PAGE_INIT_TIMEOUT = process.env.PAGE_INIT_TIMEOUT || 0;
const __SERVER__ = 'http://localhost:5000';

  let currentLocation = null;
  let currentState = null;

  normalize.use();
  fonts.use();

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

async function render(state, router) {

  let element = document.getElementById("app");
  if (!element) {
    element = document.createElement("div");
    element.setAttribute("id", "app");
    document.body.appendChild(element);
  }

  let routedComponent;
  let modelPromise = null;

  await router.dispatch(state, async(state, Component) => {
    require(`bundle-loader?lazy!./pages/${Component.type}/index.js`)( async (RoutedComponent) => {
      modelPromise = RoutedComponent.model(state.params);
      routedComponent = <RoutedComponent modelPromise={modelPromise} request={state}/>;
      let serverstyle = document.getElementById("server-style");
      if (serverstyle) {
        if (modelPromise) {
          await modelPromise;
        }
        serverstyle.parentNode.removeChild(serverstyle);
      } else {
        window.scrollTo(0, 0)
      }
      ReactDOM.render(routedComponent ? routedComponent : <Preloader />, element);

    });
  });

}
