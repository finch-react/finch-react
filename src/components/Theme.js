import React, {
  Component,
} from 'react-native';

export default class Theme extends Component {
  render() {
    return this.props.children;
  }

  getChildContext() {
    return {...this.context, theme: this.props.name};
  }
}

Theme.childContextTypes = {
  theme: React.PropTypes.string
};
