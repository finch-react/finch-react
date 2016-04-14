import React, { Component } from 'react';
import css from './View.css';

export default class View extends Component {
  static contextTypes = {
    onServerStyle: React.PropTypes.func
  };

  render() {
    let className = this.props.className ? `${this.props.className} ${css.locals.view}` : css.locals.view;
    let props = {...this.props, className};
    return (
      <span {...props}>
        {this.props.children}
      </span>
    );
  }

  componentWillMount() {
    this.context.onServerStyle && this.context.onServerStyle("view", css);
  }
}
