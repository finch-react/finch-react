import React, {
  Component,
  Linking,
  Navigator,
  View,
  Text
} from 'react-native';
import eventEmitterFactory from 'event-emitter';
import router from '../router';

const __SERVER__ = 'http://localhost:5000';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    Linking.addEventListener('url', this._handleUrlListener = this._handleUrl.bind(this));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrlListener);
  }

  async _handleUrl(event) {
    let url = event.url || 'finch:///';
    let path = '/' + url.split('/').splice(3).filter(path=>path).join('/');
    let routes = this.refs.navigator.getCurrentRoutes();

    let replace;
    if (routes[routes.length - 1] && routes[routes.length - 1].path === path) {
      replace = true;
    }

    let alreadyInRouteStack;
    if (!replace) {
      routes.forEach(route => {
        if (route.path === path) {
          alreadyInRouteStack = route;
        }
      });
    }

    if (alreadyInRouteStack) {
      this.refs.navigator.popToRoute(alreadyInRouteStack);
    } else {
      let routedState;
      let routedComponent;
      let modelEmitter = eventEmitterFactory({});
      await router.dispatch({path}, (state, RoutedComponent) => {
        routedState = state;
        //legacy for babel6 module system
        RoutedComponent = 'default' in RoutedComponent ? RoutedComponent['default'] : RoutedComponent;
        routedComponent = <RoutedComponent modelEmitter={modelEmitter} />;
        if (replace) {
          this.refs.navigator.replace({routedComponent, path});
        } else {
          this.refs.navigator.push({routedComponent, path});
        }
      });

      if (routedComponent.type.model) {
        if (__SERVER__) {
          fetch(__SERVER__ + path, {
            headers: {
              'Accept': 'application/json'
            }
          })
            .then(response => response.json())
            .then(json => {
              modelEmitter.emit('model', json);
              modelEmitter.emit('end');
            });
        }
        // await modelInitialization(routedComponent.type.model, modelEmitter, routedState.params, 300);
      }
    }
  }

  render() {
    return <Navigator ref="navigator"
      style={{flex: 1}}
      initialRoute={{path: '/', index: 0}}
      renderScene={this._renderScene.bind(this)}
    />
  }

  _renderScene(route, navigator) {
    return (
      route.routedComponent ? <View style={{flex: 1}}>{route.routedComponent}</View> : <View style={{flex: 1}}><Text>Loading...</Text></View>
    );
  }

  componentDidMount() {
    Linking.getInitialURL().then(url=>!url && Linking.openURL('finch:///'));
  }
}
