import RedditComment from '../RedditComment/index';
import { StyledComponent } from 'finch-react-core';

export default class RedditCommentsList extends StyledComponent {

  styles = require('./RedditCommentList.css');

  render() {
    return (
      <div>
        <span className="title">Comments</span>
        {this.props.comments.map(comment => <RedditComment key={comment.data.id} {...comment.data} />)}
      </div>
    )
  }
}
