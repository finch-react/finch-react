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
  // static async model() {
  //   await delay(1000);
  //   return {
  //     foo: 2
  //   }
  // }

  // Вариант модели, разбитой на несколько полей
  static model = {
    async foo(p) {
      await delay(1000);
      return 1;
    },
    bar: 2,
    baz: (params) => ({
      async foo() {
        return 3;
      },
      bar: new class {
        foo = delay(3000, 'new class')
      }
    }),
    baz2: [
      delay(2000, 'item 1'),
      delay(1000, 'item 2'),
      delay(3000, 'item 3'),
    ]
  };

  // Ещё вариант модели
  // static model = ({...params}) => ({
  //   async foo() {
  //     await delay(1000);
  //     return 2;
  //   },
  //   bar: 1
  // })


  render() {
    console.log(this.state);
    return (
      <View style={{paddingTop: 20}}>
        <Text>Beginning...</Text>
        {this.state.foo && <Text>{this.state.foo}</Text>}
      </View>
    );
  }
}
