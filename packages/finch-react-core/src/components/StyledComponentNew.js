import {PropTypes, Component} from "react";

export default class StyledComponentNew extends Component {

  static contextTypes = {
    onServerStyle: PropTypes.func
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

