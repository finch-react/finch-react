import React from 'react-native';
let { PropTypes, Text } = React;
import FinchReactStyles from 'finch-react-styles';
let { StyledComponent } = FinchReactStyles;

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
