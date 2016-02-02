import React, {
  PropTypes,
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
import ButtonDummy from './ButtonDummy'

let {StyledComponent} = FinchReactStyles;

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
    isActive: false,
    isHover: false
  };

  render() {
    return (
      <ButtonDummy {...this.props}
        active={this.state.isActive}
        hover={this.state.isHover}
        element="main"
        attach="onClick, onPress, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseOut, onMouseOver, onMouseOut">
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
    this.setState({isHover: false});
  }

  main_onMouseOver() {
    this.setState({isHover: true});
  }

  main_onTouchStart() {
    this.main_onMouseDown()
  }

  main_onTouchEnd() {
    this.main_onMouseUp()
  }
}


