import React from 'react';
import ReactDOM from 'react-dom';

export default function appRunner(RootComponent, initialProps, rootTag) {
  let element = document.createElement("div");
  document.body.appendChild(element);
  ReactDOM.render(<RootComponent />, element);
}
