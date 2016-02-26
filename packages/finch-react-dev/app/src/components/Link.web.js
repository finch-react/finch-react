import React from 'react-native';
let { PropTypes } = React;
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import FinchReactRouting from 'finch-react-routing';

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
    e.preventDefault();
    FinchReactRouting.Location.push(this.props.href);
    console.log(`Web Link pressed ${this.props.href}`);
  }
}
