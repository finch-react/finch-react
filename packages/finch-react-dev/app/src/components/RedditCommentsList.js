import RedditComment from './RedditComment';
import FinchReactCore from 'finch-react-core';
let { StyledComponentNew } = FinchReactCore;

export default class RedditCommentsList extends StyledComponentNew {

  styles = require('./RedditCommentList.css');

  render() {
    const { title } = this.styles.locals;
    return (
      <div>
        <span className={title}>Comments</span>
        {this.props.comments.map(comment => <RedditComment key={comment.data.id} {...comment.data} />)}
      </div>
    )
  }
}
