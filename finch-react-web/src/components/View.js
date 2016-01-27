import React, {Component} from 'react';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent} = FinchReactStyles;

export default class View extends Component {
  render() {
    return (
      <span {...this.props}>
        {this.props.children}
      </span>
    );
  }
}
