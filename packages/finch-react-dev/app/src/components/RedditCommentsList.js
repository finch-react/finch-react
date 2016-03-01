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
        <Text element="title">Comments</Text>
        {this.props.comments.map(comment => <RedditComment key={comment.data.id} {...comment.data} />)}
      </View>
    )
  }

  static styles = {
    title: {
      color: '#717171',
      marginTop: 10,
      fontWeight: 'bold'
    }
  };
}
