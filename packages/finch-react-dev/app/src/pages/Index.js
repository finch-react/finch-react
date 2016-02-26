import React, {
  Component,
  PropTypes,
  Platform,
  View,
  ScrollView,
  Text,
  Linking
} from 'react-native';
import fetch from 'isomorphic-fetch';
import Page from '../lib/Page';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';

class RedditItem extends StyledComponent {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
  }
  static styles(T) {
    return {
      main: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
      },
      text: {
        color: 'red'
      }
    }
  }
  render() {
    return (
      <View>
        <Text element="text">{this.props.title}</Text>
      </View>
    )
  }
}

class RedditList extends StyledComponent {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  }

  render() {
    return (
      <View>
        {this.props.items.map(item => <RedditItem key={item.data.id} {...item.data} />)}
      </View>
    )
  }
}

export default class extends Page {
  static model(params) {
    const lists = {
      'new': 'https://www.reddit.com/new.json?limit=5',
      'hot': 'https://www.reddit.com/hot.json?limit=5',
      'top': 'https://www.reddit.com/top.json?limit=5'
    }
    return fetch(lists[params.list || 'top']).then(response => response.json())
  };

  render() {
    return (
      <ScrollView style={{paddingTop: 20}}>
      <View>
        <Link href='/?list=new'>Новое</Link>
        <Link href='/?list=hot'>Горячее</Link>
        <Link href='/?list=top'>Лучшее</Link>
      </View>
      { this.state.data && <RedditList items={this.state.data.children} /> }
      </ScrollView>
    );
  }
}
