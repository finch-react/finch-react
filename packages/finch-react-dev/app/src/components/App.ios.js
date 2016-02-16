import React, {
  Component,
  LinkingIOS,
  View,
  Text
} from 'react-native';
import FinchReactRouting from 'finch-react-routing';
import eventEmitterFactory from 'event-emitter';
import routes from '../routes';

let  {routerFactory, delay, modelInitialization} = FinchReactRouting;
const router = routerFactory(routes);

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    LinkingIOS.addEventListener('url', this._handleUrlListener = this._handleUrl.bind(this));
  }

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleUrlListener);
  }

  async _handleUrl(event) {
    let url = event.url || 'finch:///';
    let path = '/' + url.split('/').splice(3).filter(path=>path).join('/');
    let routedComponent;
    let modelEmitter = eventEmitterFactory({});
    await router.dispatch({path}, (_, RoutedComponent) => {
      //legacy for babel6 module system
      RoutedComponent = 'default' in RoutedComponent ? RoutedComponent['default'] : RoutedComponent;
      routedComponent = <RoutedComponent modelEmitter={modelEmitter} />;
      this.setState({
        routedComponent,
        path
      });
    });

    if (routedComponent.type.model) {
      await modelInitialization(routedComponent.type.model, modelEmitter, {}, 300);
    }
  }

  render() {
    return (
      this.state.routedComponent ? <View>{this.state.routedComponent}</View> : <View><Text>Loading...</Text></View>
    );
  }

  componentDidMount() {
    if (!LinkingIOS.popInitialURL()) {
      LinkingIOS.openURL('finch:///');
    }
  }
}
