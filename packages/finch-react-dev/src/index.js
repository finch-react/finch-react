import 'babel-polyfill';
import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';

AppRegistry.registerComponent('FinchReactDev', () => App);

if (Platform.OS == 'web') {
  AppRegistry.runApplication('FinchReactDev', {});
}
