import {PropTypes} from 'react';
import { StyledComponentNew } from 'finch-react-core';
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
