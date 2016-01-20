import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';

let id = 0;
let themesRepo = {};

class Theme {
  constructor(name, props) {
    if (themesRepo[name]) {
      return themesRepo[name];
    } else {
      this._id = id++;
      this._name = name;
      this._props = [];
      themesRepo[name] = this;
    }
    if (name !== 'default' && !themesRepo.default) {
      console.error('Register default theme first');
    }
    this._add(props);
  }

  get(expression, defaultValue) {
    try {
      let result = eval('this.' + expression);
      if (_.isFunction(result)) {
        result = result(this);
      }
      if (typeof result === 'undefined') {
        return defaultValue;
      }
      return result;
    } catch (e) {
      return defaultValue;
    }
  }

  _add(p) {
    this._props.push(p);
  }

  static _build(theme, context, p) {
    for (let pKey in p) {
      if (pKey.startsWith('_')) {
        continue;
      }
      let prop = p[pKey];
      if (_.isFunction(prop)) {
        prop = prop(theme);
      }
      if (_.isPlainObject(prop)) {
        Theme._build(theme, prop, prop);
      }
      let props = {};
      props[pKey] = prop;
      Object.assign(context, props);
    }
  }

  static invalidate() {
    for (let t in themesRepo) {
      delete themesRepo[t];
    }
  }
}

export default class Themes {
  static get(name = 'default') {
    let theme = themesRepo[name];
    if (theme) {
      if (!theme._built) {
        if (name !== 'default') {
          let defaultTheme = themesRepo.default;
          for (let p in defaultTheme) {
            if (defaultTheme.hasOwnProperty(p) && !p.startsWith('_')) {
              theme[p] = _.cloneDeep(defaultTheme[p]);
            }
          }
        }
        for (let p in theme._props) {
          Theme._build(theme, theme, theme._props[p]);
        }
        theme._built = true;
      }
    } else {
      theme = new Theme(name);
      themesRepo[name] = theme;
    }
    return theme;
  }

  static register(p) {
    Themes.override('default', p);
  }

  static override(themeName, p) {
    let theme = themesRepo[themeName];
    let props = Themes._validateThemeProps(p);

    if (!theme) {
      theme = new Theme(themeName, props);
    } else {
      theme._add(props);
    }

    return this;
  }

  static _validateThemeProps(p) {
    invariant((_.isPlainObject(p) || _.isFunction(p)),
      'Theme styles must be plain object or function');

    let props = p;

    if (_.isFunction(p)) {
      props = p();
      invariant(_.isPlainObject(props), 'Theme styles function must return plain object');
    }

    return props;
  }
}
