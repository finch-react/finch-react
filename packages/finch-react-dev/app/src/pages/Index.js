import React, {
  Component,
  PropTypes,
  Platform,
  View,
  Text,
  Linking,
  TouchableHighlight
} from 'react-native';
import Page from '../lib/Page';
import FinchReactRouting from 'finch-react-routing';
let {delay} = FinchReactRouting;

export default class extends Page {
  static model = {
    async foo(p) {
      await delay(1000);
      return 1;
    },
    async bar(p) {
      let foo = await this.foo();
      await delay(500);
      return foo + 1;
    }
  };

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <Text>Beginning...</Text>
        {this.state.foo && <Text>{this.state.foo}</Text>}
        {this.state.bar && <TouchableHighlight onPress={this._onPressButton}><Text>Go to another page</Text></TouchableHighlight>}
      </View>
    );
  }

  _onPressButton() {
    Linking.openURL('finch:///awesomePage')
  }
}
