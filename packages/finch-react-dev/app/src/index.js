import 'babel-polyfill';
import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';

if ('web' === Platform.OS ) {
  App();
} else {
  AppRegistry.registerComponent('FinchReactDev', () => App);
}

