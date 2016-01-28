import React from 'react';
import ReactDOM from 'react-dom';

export default function appRunner(RootComponent, initialProps, rootTag) {
  console.log("Render");
  let element = document.getElementById("app");
  if (!element) {
    document.createElement("div");
    document.body.appendChild(element);
  }
  ReactDOM.render(<RootComponent />, element);
  console.log("Remove server styles");
  element = document.getElementById("server-style");
  if (!element) {
    element.parentNode.removeChild(element);
  }
}
