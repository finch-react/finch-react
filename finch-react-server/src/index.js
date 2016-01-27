import React from 'finch-react-web';
import appRunner from './lib/appRunner';

export default {
  ...React,
  AppRegistry: React.AppRegistry.withAppRunner(appRunner)
}
