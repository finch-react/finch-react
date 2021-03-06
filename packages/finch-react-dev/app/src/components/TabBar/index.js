import {PropTypes} from 'react';
import { StyledComponent } from 'finch-react-core';
import Link from '../Link/index';

export default class TabBar extends StyledComponent {

  styles = require('./TabBar.css');

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  };

  render() {
    return (
      <div className="main">
        <Link name="Index" list='top'>Лучшее</Link>
        <Link name="Index" list='hot'>Горячее</Link>
        <Link name="Index" list='new'>Новое</Link>
      </div>
    )
  }

}
