import {Proptypes} from 'react';
import { StyledComponent } from 'finch-react-core';

export default class Preloader extends StyledComponent {

  styles = require('./Preloader.css');

  render() {
    return (
      <div>
        <div className="main">
          <div className="preloader"></div>
        </div>
      </div>
    )
  }
}
