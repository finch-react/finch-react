import {PropTypes} from 'react';
import { StyledComponent } from 'finch-react-core';
import RedditItem from '../RedditItem/index';

export default class RedditList extends StyledComponent {
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
