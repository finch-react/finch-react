import {
  PropTypes,
} from 'react';

export default class {
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
