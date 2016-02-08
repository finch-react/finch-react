import React from 'react';
import View from './components/View';
import Text from './components/Text';
import Image from './components/Image';
import Platform from './lib/Platform';
import Dimensions from './lib/Dimensions';
import AppRegistry from './lib/AppRegistry';
import appRunner from './lib/appRunner';

export default {
  ...React,
  View,
  ScrollView: View,
  Text,
  Image,
  Platform,
  Dimensions,
  AppRegistry: AppRegistry.withAppRunner(appRunner)
}
