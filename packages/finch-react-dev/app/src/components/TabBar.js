import React, {
  PropTypes,
  View,
  TouchableHighlight,
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;
import Link from '../components/Link';

export default class TabBar extends StyledComponent {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.any
  };

  render() {
    return (
      <View>
        <Link element="link" href='/top'>Лучшее</Link>
        <Link element="link" href='/hot'>Горячее</Link>
        <Link element="link" href='/new'>Новое</Link>
      </View>
    )
  }

  static styles = {
    main: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#ebe9e9',
    },
    link: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      color: '#999'
    }
  };
}
