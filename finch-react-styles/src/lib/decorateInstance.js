import Theme from './Theme';
import reactTransform from './reactTransform';
import warning from 'fbjs/lib/warning';
import _ from 'lodash';

export default function decorateInstance(component) {
  let render = component.render;
  component.render = function () {
    let theme = component.context.theme || Theme.get();
    let style = theme.style(component);
    let result = reactTransform(render.call(component), (element, isMain)=> {
      let extraProps = {element: undefined, attach: undefined};
      if (element.props.props) {
        let props = element.props.props;
        if (_.isString(props)) {
          props = props.split(/\s*,\s*/);
        }
        for (let i = 0; i < props.length; i++) {
          let name = props[i];
          extraProps[name] = component.props[name];
        }
      }
      style.transform(element, component.props, extraProps, isMain);
      if (element.props.element && element.props.attach) {
        let attach = element.props.attach;
        if (_.isString(attach)) {
          attach = attach.split(/\s*,\s*/);
        }
        for (let i = 0; i < attach.length; i++) {
          let name = attach[i];
          let methodName = element.props.element + "_" + name;
          if (_.isFunction(component[methodName])) {
            if (_.isFunction(element.props[name])) {
              extraProps[name] = (...args)=> {
                if (component[methodName].apply(component, args) === false) {
                  return false;
                }
                return element.props[name](...args);
              };
            } else {
              extraProps[name] = component[methodName].bind(component);
            }
          } else {
            warning(false, `Component "${component.constructor.name}" has no method "${methodName}"`);
          }
        }
      }
      return extraProps;
    });
    return result;
  };

  let componentWillUnmount = component.componentWillUnmount;
  component.componentWillUnmount = function () {
    let theme = component.context.theme || Theme.get();
    theme.unmount(component);
    if (_.isFunction(componentWillUnmount)) {
      return componentWillUnmount.apply(component, arguments);
    }
  }
}
