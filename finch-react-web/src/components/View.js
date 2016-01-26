import React, {Component} from 'react';

export default class View extends Component {
  render() {
    return (
      <span {...this.props}>
        {this.props.children}
      </span>
    );
  }
}
