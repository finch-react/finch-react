import Theme from './Theme';
import reactTransform from './reactTransform';
import {Platform} from 'react-native';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import warning from 'fbjs/lib/warning';
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
      if(element.props.props) {
        let props = element.props.props;
        if (_.isString(props)) {
          props = props.split(/\s*,\s*/);
        }
        for (let i = 0; i < props.length; i++) {
          let name = props[i];
          extraProps[name] = component.props[name];
        }
      }
      if (element.props.element && element.props.attach) {
        let attach = element.props.attach;
        if (_.isString(attach)) {
          attach = attach.split(/\s*,\s*/);
        }
        for (let i = 0; i < attach.length; i++) {
          let name = attach[i];
          let methodName = element.props.element + "_" + name;
          if (_.isFunction(component[methodName])) {
            extraProps[name] = component[methodName].bind(component);
          } else {
            warning(false, `Component has no method ${methodName}`);
          }
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
