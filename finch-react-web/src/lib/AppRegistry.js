import appRunnerDefault from './appRunner';
import With from './With';

const components = {};

class AppRegistry extends With {
  appRunner = appRunnerDefault;

  registerComponent(appKey, getComponentFunc) {
    components[appKey] = {
      run: (appParameters) =>
        appRunner(getComponentFunc(), appParameters.initialProps, appParameters.rootTag)
    };
    return appKey;
  }

  registerRunnable(appKey, func) {
    components[appKey] = {
      run: func
    };
    return appKey;
  }

  getAppKeys() {
    return Object.keys(components);
  }

  runApplication(appKey, appParameters) {
    components[appKey].run(appParameters);
  }

  withAppRunner(appRunner) {
    return this.with({appRunner});
  }
}

export default new AppRegistry();
