import React, { View as ReactView } from 'react-web';

export default class View extends ReactView {
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
