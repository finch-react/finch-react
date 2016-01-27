import React, {Component, Span} from 'react';

export default class View extends Component {
  render() {
    let className = this.props.className ? `${this.props.className} view` : "view";
    let props = {...this.props, className};
    return (
      <span {...props}>
        {this.props.children}
      </span>
    );
  }
}
