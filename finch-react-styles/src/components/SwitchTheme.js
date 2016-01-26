import React, {
  Component,
} from 'react-native';
import Theme from '../lib/Theme';

export default class SwitchTheme extends Component {
  static childContextTypes = {
    theme: React.PropTypes.object
  };

  render() {
    return this.props.children;
  }

  getChildContext() {
    return {...this.context, theme: Theme.get(this.props.name)};
  }
}
