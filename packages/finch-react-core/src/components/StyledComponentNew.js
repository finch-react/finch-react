import React, {Component} from "react";

export default class StyledComponentNew extends Component {

  static contextTypes = {
    onServerStyle: React.PropTypes.func
  };

  componentWillMount() {
    if (this.context.onServerStyle) {
      this.styles && this.context.onServerStyle(this.styles)
    } else {
      this.styles && this.styles.use();
    }
  }

  componentWillUnmount() {
    this.styles && this.styles.unuse();
  }
}

