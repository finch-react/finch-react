import React, {Component, PropTypes} from 'react';
import allOff from 'event-emitter/all-off';

export default class extends Component {
  static propTypes = {
    stream: PropTypes.any,
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

  componentWillMount() {
    if (this.props.modelEmitter && this.props.modelEmitter._model) {
      this._setModel(transformModel(this.props.modelEmitter._model));
    }
  }

  componentDidMount() {
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
      modelEmitter.on('model', this._setModel.bind(this));
    }
  }

  _setModel(m) {
    let model = {'model': transformModel(m)};
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
