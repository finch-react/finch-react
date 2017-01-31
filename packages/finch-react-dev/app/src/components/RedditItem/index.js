import {PropTypes} from 'react';
import { StyledComponent } from 'finch-react-core';
import Link from '../Link/index';
import time from '../../lib/timeFromUTC';

export default class RedditItem extends StyledComponent {

  styles = require('./RedditItem.css');

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    const MAX_AUTHOR_LIMIT = 15;
    return (
      <div className="main">
        <div className="title">
          <Link name="Post" id={this.props.id}>{this.props.title}</Link>
        </div>
        <div className="meta">
          <span className="metaAuthor">
            { ((this.props.author).length > MAX_AUTHOR_LIMIT) ? (((this.props.author).substring(0, MAX_AUTHOR_LIMIT - 3)) + '...') : this.props.author }
          </span>
          <span className="metaItem">{time(this.props.created_utc)}</span>
          <span className="metaItem">{this.props.score}</span>
        </div>
      </div>
    )
  }
}
