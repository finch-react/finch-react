import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import WithContext from '../components/WithContext';

export default function runApplication(RootComponent, initialProps, rootTag) {
  let styles = {};
  let context = {
    onServerStyle(style) {
      styles[style._id] = style;
    }
  };
  console.log(ReactDOMServer.renderToStaticMarkup(<WithContext context={context}><RootComponent /></WithContext>));
  for(let style in styles) {
    console.log(styles[style].toString());
  }
}
