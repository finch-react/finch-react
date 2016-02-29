import React, {
  View,
  Text,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;

export default class RedditComment extends StyledComponent {
  static styles(T) {
    return {
      main: {
        padding: 10
      }
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.author} write in {new Date(this.props.created_utc*1000).toString()}: {this.props.body}</Text>
      </View>
    )
  }
}
