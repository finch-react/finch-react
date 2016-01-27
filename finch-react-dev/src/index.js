import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';

AppRegistry.registerComponent('ReactNativeWebExample', () => App);

if (Platform.OS == 'web') {
  AppRegistry.runApplication('ReactNativeWebExample', {});
}
