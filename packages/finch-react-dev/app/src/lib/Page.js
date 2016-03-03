import React, {
  Component,
  PropTypes
} from 'react-native';
import allOff from 'event-emitter/all-off';
import pullHydrate from './pullHydrate';
import localCache from './localCache';

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
      let cached = localCache.check();
      if (cached) {
        this.state = cached;
      }
    }
  }

  componentDidMount() {
    pullHydrate(this._setModel.bind(this));
    this._listenModelEmitter(this.props.modelEmitter);
  }

  componentDidUpdate(prevProps) {
    this._listenModelEmitter(this.props.modelEmitter, prevProps.modelEmitter)
  }

  _listenModelEmitter(modelEmitter, prevModelEmitter) {
    let subscribe = false;

    if (prevModelEmitter) {
      if (prevModelEmitter !== modelEmitter) {
        allOff(prevModelEmitter);
        subscribe = true;
      }
    } else {
      subscribe = true;
    }

    if (subscribe) {
      modelEmitter.on('model', model => {
        pullHydrate.hydrateEnd = true;
        this._setModel(model);
      });
    }
  }

  _setModel(m) {
    let model = {'model': transformModel(m)};
    localCache.store(model);
    this.setState(model);
  }

  getChildContext() {
    return this.props.context;
  }

}

function transformModel(model) {
  if ('_model' in model) {
    model = model['_model'];
  }
  return model;
}
