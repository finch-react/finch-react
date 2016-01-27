import React from 'react';
import ReactDOM from 'react-dom';
import With from './With';

export default function appRunner(RootComponent, initialProps, rootTag) {
  let element = document.createElement("div");
  document.body.appendChild(element);
  ReactDOM.render(<RootComponent />, element);

  console.log(new With().with({a:1}).with({b:1}));
}
