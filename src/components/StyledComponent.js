import React, {
  Component
} from 'react-native';
import Styles from '../lib/Styles';

export default class StyledComponent extends Component {
  constructor(...args) {
    super(...args);
    let render = this.render;
    this.render = () => {
      return Styles.linkRefs(this._styles, render.call(this), this.props, this.context, this.context.theme, true);
    };
  }

  componentWillMount() {
    this._styles = Styles.create(this.props.styles).use(this.context.theme);
  }

  componentWillUnmount() {
    this._styles.unuse(this.context.theme);
  }
};

StyledComponent.contextTypes = {
  theme: React.PropTypes.string
};
