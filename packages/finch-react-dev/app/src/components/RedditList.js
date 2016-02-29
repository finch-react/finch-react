import React, {
  PropTypes,
  View,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import RedditItem from '../components/RedditItem';

export default class RedditList extends StyledComponent {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  };

  render() {
    return (
      <View>
        {this.props.items.map(item => <RedditItem key={item.data.id} {...item.data} />)}
      </View>
    )
  }
}
