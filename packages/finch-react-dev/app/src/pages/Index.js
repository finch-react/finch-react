import React, {
  Component,
  PropTypes,
  Platform,
  View,
  ScrollView,
  Text,
  Linking
} from 'react-native';
import fetch from '../lib/fetch';
import Page from '../lib/Page';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';
import RedditList from '../components/RedditList';
import Post from './Post';

export default class extends Page {
  static model(params) {
    let list = params.list || 'top';
    const lists = {
      'top': 'https://www.reddit.com/top.json?limit=5',
      'hot': 'https://www.reddit.com/hot.json?limit=5',
      'new': 'https://www.reddit.com/new.json?limit=5'
    };
    return fetch(lists[list]).then(response => response.json())
  };

  render() {
    return (
      <ScrollView style={{paddingTop: 20}}>
        <View>
          <Link href='/top'>Лучшее</Link>
          <Link href='/hot'>Горячее</Link>
          <Link href='/new'>Новое</Link>
        </View>
        { this.state.data && <RedditList items={this.state.data.children} /> }
      </ScrollView>
    );
  }
}
