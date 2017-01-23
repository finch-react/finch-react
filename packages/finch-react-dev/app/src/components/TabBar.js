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
        <Link element="link" href='/top'>Лучшее</Link>
        <Link element="link" href='/hot'>Горячее</Link>
        <Link element="link" href='/new'>Новое</Link>
      </div>
    )
  }

}
