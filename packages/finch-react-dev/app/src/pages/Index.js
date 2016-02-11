import React, {
  Component,
  PropTypes,
  Platform,
  View
} from 'react-native';
import Page from '../lib/Page';
import App from '../components/App';
import {delay} from 'finch-react-routing';

export default class extends Page {
  static model = {
    async foo(p) {
      await delay(200);
      return 1;
    },
    async bar(p) {
      let foo = await this.foo();
      return foo + 1;
    }
  };

  render() {
    return (
      <div />
    );
  }
}
