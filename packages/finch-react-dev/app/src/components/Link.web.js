import React from 'react-native';
let { PropTypes, Text } = React;
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;

export default class Link extends StyledComponent {
  static propTypes = {
    href: PropTypes.string
  };

  static styles = {
    main: {
      color: 'blue'
    }
  };

  render() {
    return (
      <a href={this.props.href} onClick={this.onPress.bind(this)}>
        {this.props.children}
      </a>
    );
  }

  onPress(e) {
    console.log(`Web Link pressed ${this.props.href}`);
  }
}
