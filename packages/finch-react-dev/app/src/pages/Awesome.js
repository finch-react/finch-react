import React, {
  Component,
  PropTypes,
  Platform,
  View,
  Text,
  LinkingIOS,
  TouchableHighlight
} from 'react-native';
import Page from '../lib/Page';
import FinchReactRouting from 'finch-react-routing';
let {delay} = FinchReactRouting;

export default class extends Page {

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <Text>Awesome page</Text>
        <TouchableHighlight onPress={this._onPressButton}><Text>Go back</Text></TouchableHighlight>
      </View>
    );
  }

  _onPressButton() {
    LinkingIOS.openURL('finch://');
  }
}
