import React from 'react';
import View from './components/View';
import Text from './components/Text';
import Platform from './lib/Platform';
import AppRegistry from './lib/AppRegistry';
import appRunner from './lib/appRunner';

export default {
  ...React,
  View,
  ScrollView: View,
  Text,
  Platform,
  AppRegistry: AppRegistry.withAppRunner(appRunner)
}
