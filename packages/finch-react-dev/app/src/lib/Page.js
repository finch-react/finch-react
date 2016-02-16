import React, {
  Component,
  PropTypes,
  Platform
} from 'react-native';
import FinchReactCore from 'finch-react-core';
let { StyledComponent } = FinchReactCore;

export default class extends Component {
  static propTypes = {
    modelEmitter: PropTypes.any
  };

  static childContextTypes = {
    model: PropTypes.any,
    onServerStyle: PropTypes.func
  };

  constructor() {
    super();
    if (this.constructor.model) {
      this.state = {};
      Object.keys(this.constructor.model).forEach(key => this.state[key] = void(0));
    }
  }

  componentWillMount() {
    this.props.modelEmitter.on('model', (model)=>{
      this.setState(model);
    });
  }

  getChildContext() {
    return this.props.context;
  }
}
