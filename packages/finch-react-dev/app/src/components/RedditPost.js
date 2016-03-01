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
        <Text element="title">{this.props.title}</Text>
      </View>
    )
  }
  static styles = T => [
    {
      main: {
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#939ca6',
      }
    }
  ];

}
