import React, {
  PropTypes,
  View,
  Text,
  Image
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';
import Post from '../pages/Post';
import router from '../router';
import time from '../lib/timeFromUTC';

export default class RedditItem extends StyledComponent {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
  };

  static styles = T => [
    {
      main: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#fafafa',
        borderStyle: 'solid',
        flex: 1,
      },
      title: {
        color: '#939ca6',
        fontSize: 16,
        fontWeight: 'bold'
      },
      meta: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
      },
      meta__item: {
        color: '#b8b8b6',
        fontSize: 13,
        marginRight: 10
      },
      meta__author: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#4f6173',
        marginRight: 10
      }
    }
  ];

  render() {
    const MAX_AUTHOR_LIMIT = 15;
    return (
      <View>
        <Link element="title" href={router.ref(Post, {id: this.props.id})}>{this.props.title}</Link>
        <View element="meta">
          <Text element="meta__author">
            { ((this.props.author).length > MAX_AUTHOR_LIMIT) ? (((this.props.author).substring(0, MAX_AUTHOR_LIMIT - 3)) + '...') : this.props.author }
          </Text>
          <Text element="meta__item">{time(this.props.created_utc)}</Text>
          <Text element="meta__item">{this.props.score}</Text>
        </View>
      </View>
    )
  }
}
