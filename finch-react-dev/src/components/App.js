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
          <Button>default</Button>
          <Button color="primary">primary</Button>
          <Button color="success">success</Button>
          <Button color="info">info</Button>
          <Button color="warning">warning</Button>
          <Button color="danger">danger</Button>
        </View>
        <Text>Size</Text>
        <View element="buttonWrapper">
          <Button size="tiny">tiny</Button>
          <Button size="small">small</Button>
          <Button>medium</Button>
          <Button size="large">large</Button>
        </View>
        <Text>Flex layout</Text>
        <View element="buttonWrapper">
          <Button flex="1">flex 1</Button>
          <Button color="primary" flex="2">flex 2</Button>
          <Button color="success" flex="3">flex 3</Button>
          <Button color="info" flex="4">flex 4</Button>
          <Button color="warning" flex="1">flex 1</Button>
          <Button color="danger" flex="1">flex 1</Button>
        </View>
      </View>
    );
  }
}
