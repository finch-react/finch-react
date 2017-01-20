import { StyledComponentNew } from 'finch-react-core';
import timeLib from '../lib/timeFromUTC';

export default class RedditComment extends StyledComponentNew {

  styles = require('./RedditComment.css');

  render() {
    const { main, meta, author, time, comment } = this.styles.locals;
    return (
      <div className={main}>
        {
          this.props.body &&
          <div>
            <div className={meta}>
              <span className={author}>{this.props.author}</span>
              <span className={time}>{timeLib(this.props.created_utc)}</span>
            </div>
            <span className={comment}>{this.props.body}</span>
          </div>
        }
      </div>
    )
  }
}
