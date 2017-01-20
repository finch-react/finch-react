import React, {Component, PropTypes} from 'react-native';
import fetch from '../lib/fetch';
import Page from '../lib/Page';
import RedditCommentsList from '../components/RedditCommentsList';
import RedditPost from '../components/RedditPost';

export default class extends Page {

  styles = require('./Post.css');

  static model(params) {
    let sort = params.sort || 'new';
    return fetch(`https://www.reddit.com/comments/${params.id}.json?limit=10&sort=${sort}`).then(response => response.json())
  };

  render() {
    const {main} = this.styles.locals
    let post = this.state.model && this.state.model[0] && this.state.model[0].data.children[0];
    let comments = this.state.model && this.state.model[1] && this.state.model[1].data.children;
    return (
      <div className={main}>
        {post && <RedditPost {...post.data} />}
        {comments && <RedditCommentsList comments={comments} />}
      </div>
    );
  };

}
