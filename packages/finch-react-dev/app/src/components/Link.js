import React from 'react-native';
let { PropTypes } = React;
import FinchReactCore from 'finch-react-core';
let { StyledComponentNew, Location } = FinchReactCore;

export default class Link extends StyledComponentNew {

  styles = require('./Link.css');

  static propTypes = {
    href: PropTypes.string
  };

  onPress = (e) => {
    e.preventDefault();
    Location.push(this.props.href);
    console.log(`Web Link pressed ${this.props.href}`);
  };

  render() {
    return (
      <a href={`${this.props.href}?nojs`} onClick={this.onPress}>
        {this.props.children}
      </a>
    );
  }

}
