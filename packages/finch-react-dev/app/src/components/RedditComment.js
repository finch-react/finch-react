import React, {
  View,
  Text,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import time from '../lib/timeFromUTC';

export default class RedditComment extends StyledComponent {
  static styles(T) {
    return {
      main: {
        padding: 10,
        flex: 1,
      },
      author: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#4f6173',
      },
      time: {
        marginLeft: 10,
        fontSize: 12,
        color: '#a5acb3',
      },
      comment: {
        color: '#000',
        fontSize: 14,
      },
      meta: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
      }
    }
  }

  render() {
    return (
      <View>
        {
          this.props.body &&
          <View>
            <View element="meta">
              <Text element="author">{this.props.author}</Text>
              <Text element="time">{time(this.props.created_utc)}</Text>
            </View>
            <Text element="comment">{this.props.body}</Text>
          </View>
        }
      </View>
    )
  }
}
