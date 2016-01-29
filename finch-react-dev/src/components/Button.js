import React, {
  PropTypes,
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent} = FinchReactStyles;

import ButtonDummy from './ButtonDummy'

export default class Button extends StyledComponent {
  static propTypes = {
    ...ButtonDummy.propTypes
  };

  static defaultProps = {
    color: "default",
    size: "medium"
  };

  static styles = T => [
    {}
  ];

  state = {
    isActive: false
  };

  render() {
    return (
      <ButtonDummy {...this.props}
        active={this.state.isActive}
        element="main"
        attach="onClick, onPress, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseOut">
        {this.props.children}
      </ButtonDummy>
    );
  }

  main_onClick() {
  }

  main_onPress() {
    this.main_onClick();
  }

  main_onMouseDown() {
    this.setState({isActive: true});
  }

  main_onMouseUp() {
    this.setState({isActive: false});
  }

  main_onMouseOut() {
    this.setState({isActive: false});
  }

  main_onTouchStart() {
    this.main_onMouseDown()
  }

  main_onTouchEnd() {
    this.main_onMouseUp()
  }
}


