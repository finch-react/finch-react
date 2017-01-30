import {PropTypes} from 'react';
import { StyledComponent, Location } from 'finch-react-core';
import router from '../../router';

export default class Link extends StyledComponent {

  styles = require('./Link.css');

  static propTypes = {
    href: PropTypes.string
  };

  onPress = (e, path) => {
    e.preventDefault();
    Location.push(path);
    console.log(`Web Link pressed ${path}`);
  };

  render() {
    const {name, ...other} = this.props;
    const path = router.ref(name, {...other, routes: router.computedRoutes});
    return (
      <a href={path} onClick={(e) => this.onPress(e, path)}>
        {this.props.children}
      </a>
    );
  }

}
