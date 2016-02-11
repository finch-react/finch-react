import React, {
  Component,
  PropTypes,
} from 'react';

export default class extends Component {
  static childContextTypes = {
    model: PropTypes.any,
    onServerStyle: PropTypes.func
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props.children;
  }
}
