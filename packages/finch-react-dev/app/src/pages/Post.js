import React, {
  Component,
  PropTypes,
  Platform,
  View,
  ScrollView,
  Text,
  Linking,
} from 'react-native';
import fetch from '../lib/fetch';
import Page from '../lib/Page';
import FinchReactCore from 'finch-react-core';
import RedditCommentsList from '../components/RedditCommentsList';
import RedditPost from '../components/RedditPost';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';

export default class extends Page {
  static model(params) {
    let sort = params.sort || 'new';
    return fetch(`https://www.reddit.com/comments/${params.id}.json?limit=10&sort=${sort}`).then(response => response.json())
  };

  render() {
    let post = this.state[0] && this.state[0].data.children[0];
    let comments = this.state[1] && this.state[1].data.children;
    return (
      <ScrollView style={{padding: 15}}>
        {post && <RedditPost {...post.data} />}
        {comments && <RedditCommentsList comments={comments} />}
      </ScrollView>
    );
  };

}
