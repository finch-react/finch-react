import React, {
  PropTypes,
  View,
  Text,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';

export default class RedditItem extends StyledComponent {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
  };

  static styles = T => [
    {
      main: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
      },
      text: {
        color: 'red'
      }
    }
  ];

  render() {
    return (
      <View>
        <Link element="text" href={`/comments/${this.props.id}`}>[{this.props.id}] {this.props.title}</Link>
      </View>
    )
  }
}
