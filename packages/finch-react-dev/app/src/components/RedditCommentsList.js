import React, {
  View,
  Text,
} from 'react-native';
import RedditComment from './RedditComment';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;

export default class RedditCommentsList extends StyledComponent {
  render() {
    return (
      <View>
        {this.props.comments.map(comment => <RedditComment key={comment.data.id} {...comment.data} />)}
      </View>
    )
  }
}
