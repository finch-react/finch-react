import React, {
  View,
  Text,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;

export default class RedditPost extends StyledComponent {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}
