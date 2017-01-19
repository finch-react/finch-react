import React from 'react-native';
let { PropTypes } = React;
import FinchReactCore from 'finch-react-core';
let { StyledComponent, Location } = FinchReactCore;

export default class Link extends StyledComponent {
  static propTypes = {
    href: PropTypes.string
  };

  render() {
    return (
      <a href={this.props.href} onClick={this.onPress.bind(this)}>
        {this.props.children}
      </a>
    );
  }

  onPress(e) {
    e.preventDefault();
    Location.push(this.props.href);
    console.log(`Web Link pressed ${this.props.href}`);
  }
}
