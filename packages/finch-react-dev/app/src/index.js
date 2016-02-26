import 'babel-polyfill';
import { polyfill } from 'es6-promise';
import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';

if ('web' === Platform.OS ) {
  polyfill();
  App();
} else {
  AppRegistry.registerComponent('FinchReactDev', () => App);
}

