import {PropTypes} from 'react';
import { StyledComponent } from 'finch-react-core';
import Link from '../components/Link';

export default class TabBar extends StyledComponent {

  styles = require('./TabBar.css');

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  };

  render() {
    const {main} = this.styles.locals;
    return (
      <div className={main}>
        <Link name="Index" list='top'>Лучшее</Link>
        <Link name="Index" list='hot'>Горячее</Link>
        <Link name="Index" list='new'>Новое</Link>
      </div>
    )
  }

}
