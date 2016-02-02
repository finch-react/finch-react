import React from 'react';
import ReactDOM from 'react-dom';

export default function appRunner(RootComponent, initialProps, rootTag) {
  let element = document.getElementById("app");
  if (!element) {
    element = document.createElement("div");
    document.body.appendChild(element);
  }
  ReactDOM.render(<RootComponent />, element);
  console.log("Remove server styles");
  element = document.getElementById("server-style");
  if (element) {
    element.parentNode.removeChild(element);
  }

  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.view {
  position:relative;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
}`;
  document.getElementsByTagName('head')[0].appendChild(style);

}

