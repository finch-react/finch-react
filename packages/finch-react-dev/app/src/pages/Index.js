import React, {
  Component,
  PropTypes,
  Platform,
  View,
  ScrollView,
  Text
} from 'react-native';
import fetch from '../lib/fetch';
import Page from '../lib/Page';
import RedditList from '../components/RedditList';
import TabBar from '../components/TabBar';

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
      <View style={{flex: 1, paddingTop: 5}}>
        <ScrollView style={{flex: 1}}>
          { this.state.model && this.state.model.data && <RedditList items={this.state.model.data.children} /> }
        </ScrollView>
        <TabBar />
      </View>
    );
  }
}
