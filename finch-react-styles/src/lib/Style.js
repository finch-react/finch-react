import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';
import {Platform} from 'react-native';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';

export default class Style {
  cssRefsCounter = 0;

  static stylesToWeb = {
    flex: (value)=>({
      flex: value,
      display: 'flex',
      wordBreak: 'break-all'
    }),
    shadowOpacity: (value, rule) => ({
      boxShadow: `${(rule.shadowOffset) ? rule.shadowOffset.width : 0}px ${(rule.shadowOffset) ? rule.shadowOffset.height : -3}px ${rule.shadowRadius || 10}px ${rule.shadowColor || 'rgba(0,0,0,' + value + ')'}`
    }),
    shadowOffset: () => null,
    shadowRadius: () => null,
    shadowColor: () => null,
    paddingVertical: (value) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    paddingHorizontal: (value) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    marginVertical: (value) => ({
      marginTop: value,
      marginBottom: value
    }),
    marginHorizontal: (value) => ({
      marginLeft: value,
      marginRight: value
    }),

  };

  static stylesToMobile = {
    cursor: (value) => null,
    display: (value) => null,
  };

  constructor(theme, styles, component) {
    this._theme = theme;

    if (!styles) {
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
        if (Platform.OS === 'web') {
          let cssRule = {};
          for (let prop in rule) {
            let styleToWeb = Style.stylesToWeb[prop];
            if (styleToWeb) {
              Object.assign(cssRule, styleToWeb(rule[prop], rule));
            } else {
              cssRule[prop] = rule[prop];
            }
          }
          style[name] = cssRule;
        } else {
          let mobileRule = {};
          Object.keys(rule).map((name)=>{
            let result = rule[name];
            if (Style.stylesToMobile[name]) {
              result = Style.stylesToMobile[name](result, rule);
            }
            if (result) {
              let r = {};
              r[name] = result;
              Object.assign(mobileRule, r);
            }
          });
          style[name] = mobileRule;
        }
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
