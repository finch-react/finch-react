import React, {PropTypes} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponentNew } = FinchReactCore;
import RedditItem from '../components/RedditItem';

export default class RedditList extends StyledComponentNew {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  };

  render() {
    return (
      <div>
        {this.props.items.map(item => <RedditItem key={item.data.id} {...item.data} />)}
      </div>
    )
  }
}
