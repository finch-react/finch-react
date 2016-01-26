import runApplication from './runApplication';

const components = {};

export default class AppRegistry {
  static registerComponent(appKey, getComponentFunc) {
    components[appKey] = {
      run: (appParameters) =>
        runApplication(getComponentFunc(), appParameters.initialProps, appParameters.rootTag)
    };
    return appKey;
  }

  static registerRunnable(appKey, func) {
    components[appKey] = {
      run: func
    };
    return appKey;
  }

  static getAppKeys() {
    return Object.keys(components);
  }

  static runApplication(appKey, appParameters) {
    components[appKey].run(appParameters);
  }
};
