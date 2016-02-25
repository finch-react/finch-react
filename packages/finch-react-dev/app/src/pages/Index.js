import React, {
  Component,
  PropTypes,
  Platform,
  View,
  Text,
  Linking
} from 'react-native';
import Page from '../lib/Page';
import FinchReactRouting from 'finch-react-routing';
let {delay} = FinchReactRouting;

export default class extends Page {
  // Вариант модели, возвращающий один объект с полями
  static async model() {
    await delay(1000);
    return {
      foo: 2
    }
  }
  // Вариант модели, разбитой на несколько полей
  // static model = {
  //   async foo(p) {
  //     await delay(1000);
  //     return 1;
  //   }
  // };

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <Text>Beginning...</Text>
        {this.state.foo && <Text>{this.state.foo}</Text>}
      </View>
    );
  }
}
