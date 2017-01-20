import React, {
  PropTypes,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponentNew } = FinchReactCore;
import Link from '../components/Link';

export default class TabBar extends StyledComponentNew {

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
