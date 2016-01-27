import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';
import Style from './Style';

const DEFAULT_NAME = 'default';

let id = 0;
let themes = {};
let templates = {};

function style(component) {
  if (component.__theme !== this) {
    if (component.__theme) {
      //component.__theme.unmount();
    }
    component.__theme = this;
    if(component.__style) {
      component.__style.unuse();
    }
    if(!component.constructor._id) {
      component.constructor._id = ++id;
    }
    if(!this.componentStyles[component.constructor._id]) {
      this.componentStyles[component.constructor._id] = new Style(this, component.styles).use();
    }
    component.__style = this.componentStyles[component.constructor._id];
  }
  return component.__style;
}

function themeFunction(name, def) {
  if (!name) {
    return _.cloneDeep(this);
  }
  try {
    return eval("this." + name)
  } catch (e) {
    return def;
  }
}

function unmount(component) {
  if (component.__style) {
    component.__style.unuse();
  }
}

export default class Theme {
  static get(name = DEFAULT_NAME) {
    let theme = themes[name];
    if (!theme) {
      return Theme.build(name);
    }
    return theme;
  }

  static build(name = DEFAULT_NAME) {
    let themeProps = {};

    let theme = themeFunction.bind(themeProps);
    theme.style = style.bind(theme);
    theme.unmount = unmount.bind(theme);
    theme.componentStyles = {};
    let template = templates[name];
    if (!template) {
      return themeProps;
    }
    if (name != DEFAULT_NAME) {
      template = [...templates['default'], ...template];
    }
    for (let i = 0; i < template.length; i++) {
      Array.prototype.concat.apply([], [template[i](theme)]).forEach(rule=>Object.assign(themeProps, rule));
    }

    Object.assign(themeProps, Theme.callFunctionsRecursively(themeProps, theme));


    //TODO event

    return themes[name] = theme;
  }

  static callFunctionsRecursively(o, arg) {
    for (let propName in o) {
      let val = o[propName];
      if (_.isPlainObject(val)) {
        o[propName] = Theme.callFunctionsRecursively(val, arg);
      }
      if (_.isFunction(val)) {
        o[propName] = val(arg);
      }
    }
    return o;
  }


  static rebuild(name = DEFAULT_NAME) {
    if (name == DEFAULT_NAME) {
      //TODO rebuild all!
    }
    let theme = themes[name];
    if (theme) {
      if (theme._timeout) {
        clearTimeout(theme._timeout);
      }
      theme._timeout = setTimeout(()=> {
        Theme.build(name);
      }, 0);
    }
  }

  static register(props) {
    return Theme.override(DEFAULT_NAME, props);
  }

  static override(name, props) {
    if (_.isPlainObject(props)) {
      let propsObject = props;
      props = ()=>[propsObject];
    }
    if (_.isArrayLike(props)) {
      let propsArray = props;
      props = ()=>propsArray;
    }
    invariant(_.isFunction(props), 'Theme props must be plain object or array like or function  that return plain object or array like');
    (templates[name] || (templates[name] = [])).push(props);
    Theme.rebuild(name);
    return this;
  }
};
