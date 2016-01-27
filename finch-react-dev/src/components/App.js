import React, {
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent} = FinchReactStyles;
import ButtonDummy from './ButtonDummy'


export default class App extends StyledComponent {
  static defaultProps = {
    open: true
  };

  static styles = T =>[
    {
      main: {
        flex: 1
      },
      text: {
        color: "red"
      },
      button: {
        color: "red"
      }
    },
    {
      $props: props => props.open,
      text: {
        color: "green"
      }
    },
    {
      $props: {
        open: true
      },
      text: {
        color: "blue"
      }
    },
  ];

  state = {
    a: 1
  };

  render() {
    return (
      <View>
        <Text>Welcome to React Native in Web!</Text>
        <Text element="text" attach="onClick, onPress">{this.state.a}Welcome to React Native in
          Web!</Text>
        <ButtonDummy attach="onClick, onPress" element="button1">Dummy button</ButtonDummy>
        <ButtonDummy attach="onClick, onPress" element="button1">Dummy button</ButtonDummy>
      </View>
    );
  }

  text_onClick() {
    this.setState(s=> ({
      a: s.a + 1
    }))
  }

  text_onPress() {
    this.text_onClick();
  }

  button1_onClick() {
    this.setState(s=> ({
      a: s.a + 1
    }))
  }

  button1_onPress() {
    this.button1_onClick();
  }
}
