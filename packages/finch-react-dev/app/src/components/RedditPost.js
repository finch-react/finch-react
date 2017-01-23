import { StyledComponent } from 'finch-react-core';

export default class RedditPost extends StyledComponent {
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
