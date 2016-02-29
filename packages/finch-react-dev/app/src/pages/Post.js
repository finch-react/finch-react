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

class RedditPost extends StyledComponent {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}

class RedditComment extends StyledComponent {
  static styles(T) {
    return {
      main: {
        padding: 10
      }
    }
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>{this.props.author} write in {new Date(this.props.created_utc*1000).toString()}: {this.props.body}</Text>
      </View>
    )
  }
}

class RedditCommentsList extends StyledComponent {
  render() {
    return (
      <View>
        {this.props.comments.map(comment => <RedditComment key={comment.data.id} {...comment.data} />)}
      </View>
    )
  }
}

export default class extends Page {
  static model(params) {
    let sort = params.sort || 'new';
    return fetch(`https://www.reddit.com/comments/${params.id}.json?limit=10&sort=${sort}`).then(response => response.json())
  };

  render() {
    let post = this.state[0] && this.state[0].data.children[0];
    let comments = this.state[1] && this.state[1].data.children;
    return (
      <ScrollView>
        {post && <RedditPost {...post.data} />}
        <Text>Comments</Text>
        {comments && <RedditCommentsList comments={comments} />}
      </ScrollView>
    );
  }
}
