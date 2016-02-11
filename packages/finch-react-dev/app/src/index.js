import 'babel-polyfill';
import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';
import routes from './routes';

if (Platform.OS == 'web') {
  AppRegistry.registerComponent('FinchReactDev', () => {});
  AppRegistry.runApplication('FinchReactDev', {initialProps:{routes}});
} else {
  AppRegistry.registerComponent('FinchReactDev', () => App);
}
