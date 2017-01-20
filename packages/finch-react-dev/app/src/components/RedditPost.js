import React from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponentNew } = FinchReactCore;

export default class RedditPost extends StyledComponentNew {
  styles = require('./RedditPost.css');

  render() {
    const {title} = this.styles.locals;
    return (
      <div>
        <span className={title}>{this.props.title}</span>
      </div>
    )
  }
}
