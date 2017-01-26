import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static propTypes = {
    stream: PropTypes.any,
    modelPromise: PropTypes.any,
    initialModel: PropTypes.any
  };

  static childContextTypes = {
    model: PropTypes.any,
    onServerStyle: PropTypes.func
  };

  state = {};

  componentWillMount() {
    if (this.props.modelPromise) {
      if (this.props.modelPromise._value) {
        this.setState({model: this.props.modelPromise._value})
      } else {
        this.props.modelPromise
          .then(model =>
            this.setState({model})
          );
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.modelPromise && this.props.modelPromise != prevProps.modelPromise) {
      this.setState({model:{}});
      this.props.modelPromise
        .then(model =>
          this.setState({model})
        );
    }
  }

  getChildContext() {
    return this.props.context;
  }

}
