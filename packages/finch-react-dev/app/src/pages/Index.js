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
      'top': 'https://www.reddit.com/top.json?limit=30',
      'hot': 'https://www.reddit.com/hot.json?limit=30',
      'new': 'https://www.reddit.com/new.json?limit=30'
    };
    return fetch(lists[list]).then(response => response.json())
  };

  render() {
    console.log('Render', this.state.model);
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch', paddingTop: 5, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 9}}>
          { this.state.model && this.state.model.data && <RedditList items={this.state.model.data.children} /> }
        </ScrollView>
        <TabBar style={{flex: 1}} />
      </View>
    );
  }
}
