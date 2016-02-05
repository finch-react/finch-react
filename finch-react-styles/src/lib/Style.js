import transformStyles from './transformStyles';
import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';

export default class Style {
  constructor(theme, styles, component) {
    this._theme = theme;

    if (!styles) {
      this._styles = [];
      return;
    }

    if (_.isPlainObject(styles)) {
      let stylesObject = styles;
      styles = ()=>[stylesObject];
    }
    if (_.isArrayLike(styles)) {
      let stylesArray = styles;
      styles = ()=>stylesArray;
    }
    if (!_.isFunction(styles)) {
      invariant(false, `${component.constructor.name}.styles must be plain object, array-like or function that return plain object or array-like`);
    }
    var s = styles(theme);

    if (_.isPlainObject(s)) {
      s = [s];
    }

    this._styles = s;
    this.buildStyles();
  }

  transform(element, props, extraProps, isMain) {
      extraProps.style = {...this.style(element, props, isMain), ...extraProps.style, ...element.props.style};
  }

  style(element, props, isMain) {
    if (!element.props.element && !isMain) {
      return;
    }
    var elementName = isMain ? "main" : element.props.element;

    let result = {};
    let styles = this._styles;
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      if (!this.validateProps(style, props)) {
        continue;
      }
      Object.assign(result, style[elementName])
    }

    return result;
  }

  buildStyles() {
    let locals = {};
    let styles = this._styles;
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      for (let name in style) {
        let rule = style[name];
        if (name.startsWith("$")) {
          continue;
        }
        let cssRule = {};
        Object.keys(rule).forEach((name)=> {
          let result = rule[name];
          if (transformStyles[name]) {
            result = transformStyles[name](result, rule);
          }
          if (result !== null) {
            let r = {};
            if (_.isPlainObject(result)) {
              r = result;
            } else {
              r[name] = result;
            }
            Object.assign(cssRule, r);
          }
        });
        style[name] = cssRule;
      }
    }
  }

  validateProps(style, props) {
    var $props = style.$props;
    if ($props) {
      if (_.isFunction($props)) {
        if (!$props(props)) {
          return false;
        }
      } else {
        for (let name in $props) {
          if ($props[name] !== props[name]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
