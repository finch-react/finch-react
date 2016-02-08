import React, { Component } from 'react';

export default class View extends Component {
  render() {
    let props = {...this.props};
    props.src = typeof props.source === 'string' ? props.source : props.source.uri;
    let imgRatio = this.props.source.height / this.props.source.width;
    let imgHeight = imgRatio * 100;
    let style = {maxWidth:'100%', width:'100vw', height:`${imgHeight}vw`};
    return (
      <img src={props.src} style={{...style, ...this.props.style}} />
    );
  }
}
