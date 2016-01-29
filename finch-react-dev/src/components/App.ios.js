import React, {
  Component,
  View,
  Text,
  Image,
  NavigatorIOS,
  AlertIOS
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent, SwitchTheme} = FinchReactStyles;

import Button from './Button'

class NavigatorMain extends StyledComponent {
  static styles = T => [
    {
      main: {
        paddingTop: 64
      },
      buttonWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
      },
      link: {
        marginVertical: 10,
        paddingLeft: 5,
        color: "#00689A"
      }
    },
  ];

  render() {
    return (
      <View>
        <Text  attach="onClick, onPress" element="link">Кнопки</Text>
      </View>
    )
  }
  link_onClick(){
    this.props.navigator.push({
      title: 'Кнопки',
      component: ButtonsView,
    });
  }
  link_onPress(){
    this.link_onClick();
  }

}

class ButtonsView extends StyledComponent {
  static styles = T =>[
    {
      main: {
        paddingTop: 64
      },
      buttonWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      },
      header: {
        marginVertical: 10,
        paddingLeft: 5,
        color: "#00689A"
      }
    }
  ];

  render() {
    return (
      <View>
        <Text element="header">Color</Text>
        <View element="buttonWrapper">
          <Button>1</Button>
          <Button color="primary">2</Button>
          <Button color="success">3</Button>
          <Button color="info">4</Button>
          <Button color="warning">5</Button>
          <Button color="danger">6</Button>
        </View>
        <Text element="header">Size</Text>
        <View element="buttonWrapper">
          <Button size="tiny">1</Button>
          <Button size="small">2</Button>
          <Button>3</Button>
          <Button size="large">4</Button>
        </View>
      </View>
    )
  }
}


export default class App extends StyledComponent {
  static defaultProps = {
    open: true
  };

  static styles = T =>[
    {
      main: {
        flex: 1
      }
    }
  ];

  rightButtonPress() {
    this.refs.nav.push({
      title: 'Правокнопковая вьюха',
      component: ButtonsView,
    });
  }
  leftButtonPress() {
    this.refs.nav.push({
      title: 'Правокнопковая вьюха',
      component: ButtonsView,
    });
  }

  render() {
    var initialRoute = {
      component: NavigatorMain,
      title: "Welcome to React Native in IOS!",
      rightButtonTitle: 'Туды',
      leftButtonTitle: 'Сюды',
      onLeftButtonPress: () => {
        this.leftButtonPress();
      },
      onRightButtonPress: () => {
        this.rightButtonPress();
      }
    };
    //
    return (
        <NavigatorIOS ref="nav" initialRoute={initialRoute} />
    );
  }
}

