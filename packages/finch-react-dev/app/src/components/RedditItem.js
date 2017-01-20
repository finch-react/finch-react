import {PropTypes} from 'react';
import { StyledComponent, StyledComponentNew } from 'finch-react-core';
import Link from '../components/Link';
import Post from '../pages/Post';
import router from '../router';
import time from '../lib/timeFromUTC';

export default class RedditItem extends StyledComponentNew {

  styles = require('./RedditItem.css');

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    const MAX_AUTHOR_LIMIT = 15;
    const { main, title, meta, metaItem, metaAuthor } = this.styles.locals;
    return (
      <div className={main}>
        <div className={title}>
          <Link href={router.ref(Post, {id: this.props.id})}>{this.props.title}</Link>
        </div>
        <div className={meta}>
          <span className={metaAuthor}>
            { ((this.props.author).length > MAX_AUTHOR_LIMIT) ? (((this.props.author).substring(0, MAX_AUTHOR_LIMIT - 3)) + '...') : this.props.author }
          </span>
          <span className={metaItem}>{time(this.props.created_utc)}</span>
          <span className={metaItem}>{this.props.score}</span>
        </div>
      </div>
    )
  }
}
