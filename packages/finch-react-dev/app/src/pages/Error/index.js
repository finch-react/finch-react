import {Component} from 'react';

export default class extends Component {
  render() {
    return (<div>{this.props.state.statusCode}: {this.props.state.path}</div>);
  }
}
