import Theme from './Theme';
import reactTransform from './reactTransform';
import {Platform} from 'react-native';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import _ from 'lodash';

export default function decorateInstance(component) {
  let render = component.render;
  component.render = function () {
    let theme = component.context.theme || Theme.get();
    let style = theme.style(component);
    return reactTransform(render.call(component), (element, isMain)=> {
      let extraProps = {};
      if (Platform.OS === 'web') {
        if (!canUseDOM && this.context.onServerStyle) {
          this.context.onServerStyle(style);
        }
        extraProps.className = style.className(element, component.props, isMain);
      } else {
        extraProps.style = style.style(element, component.props, isMain);
      }
      if (element.props.className) {
        extraProps.className += ' ' + element.props.className;
      }
      if (element.props.element && element.props.events) {
        let events = element.props.events;
        if (_.isString(events)) {
          events = events.split(/\s*,\s*/);
        }
        for (let i = 0; i < events.length; i++) {
          let name = events[i];
          extraProps[name] = component[element.props.element + "_" + name].bind(component);
        }
      }
      return extraProps;
    });
  };

  let componentWillUnmount = component.componentWillUnmount;
  component.componentWillUnmount = function () {
    let theme = component.context.theme || Theme.get();
    theme.unmount(component);
    return componentWillUnmount.apply(component, arguments);
  }
}
