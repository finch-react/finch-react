import React, {
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent, SwitchTheme} = FinchReactStyles;

import Button from './Button'


export default class App extends StyledComponent {
  static defaultProps = {
    open: true
  };

  static styles = T =>[
    {
      main: {},
      button: {

      },
      buttonWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }
    },
  ];

  state = {
    isActive: false
  };

  render() {
    return (
      <View>
        <Text>Color</Text>
        <View element="buttonWrapper">
          <Button>1</Button>
          <Button color="primary">2</Button>
          <Button color="success">3</Button>
          <Button color="info">4</Button>
          <Button color="warning">5</Button>
          <Button color="danger">6</Button>
        </View>
        <Text>Size</Text>
        <View element="buttonWrapper">
          <Button size="tiny">1</Button>
          <Button size="small">2</Button>
          <Button>3</Button>
          <Button size="large">4</Button>
        </View>
      </View>
    );
  }
}
