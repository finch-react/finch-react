import appRunnerDefault from './appRunner';

let appRunner = appRunnerDefault;

const components = {};

export default class AppRegistry {
  constructor(...props) {
    Object.assign(this, props);
  }

  static registerComponent(appKey, getComponentFunc) {
    components[appKey] = {
      run: (appParameters) =>
        appRunner(getComponentFunc(), appParameters.initialProps, appParameters.rootTag)
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

  static withAppRunner(r) {
    appRunner = r;
    return AppRegistry;
  }
};
