import React, {Component} from 'react-native';

export default class extends Component {
  render() {
    return (<View>{this.props.state.statusCode}: {this.props.state.path}</View>);
  }
}
