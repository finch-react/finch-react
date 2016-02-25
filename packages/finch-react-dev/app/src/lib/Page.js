import React, {
  Component,
  PropTypes
} from 'react-native';

export default class extends Component {
  static propTypes = {
    modelEmitter: PropTypes.any,
    initialModel: PropTypes.any
  };

  static childContextTypes = {
    model: PropTypes.any,
    onServerStyle: PropTypes.func
  };

  constructor() {
    super();
    if (this.constructor.model) {
      this.state = {};
      Object.keys(this.constructor.model).forEach(key => this.state[key] = this.constructor.model[key]._value );
    }
  }

  componentDidMount() {
    this.props.modelEmitter.on('model', (model)=>{
      if ('_model' in model) {
        model = model['_model'];
      }
      this.setState(model);
    });
  }

  getChildContext() {
    return this.props.context;
  }
}
