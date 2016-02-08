import React from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import fonts from '../fonts/PTSansWeb/PTS55F_stylesheet.css';


export default function appRunner(RootComponent, initialProps, rootTag) {
  let element = document.getElementById("app");
  if (!element) {
    element = document.createElement("div");
    document.body.appendChild(element);
  }
  ReactDOM.render(<RootComponent />, element);
  element = document.getElementById("server-style");
  if (element) {
    element.parentNode.removeChild(element);
  }
  normalize.use();
  fonts.use();
}

