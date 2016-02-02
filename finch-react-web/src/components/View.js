import React, { View as ReactView } from 'react-web';
import css from './View.css';

export default class View extends ReactView {
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
    css.use();
  }

  componentWillUnmount() {
    css.unuse();
  }
}
