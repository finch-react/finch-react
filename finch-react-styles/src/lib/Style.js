import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';
import {Platform} from 'react-native';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

let styleId = -1;
let cssRefsCounters = {};

let normalize = `
  .view {
    position:relative;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
   }
`;
let normalized = false;

export default class Style {
  static stylesToWeb = {
    flex: (value)=>({
      flex: value,
      display: 'flex'
    })
  };

  _locals = {};

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
    this._id = ++styleId;
    this.buildStyles();
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

  className(element, props, isMain) {
    if (!element.props.element && !isMain) {
      return '';
    }
    let elementName = isMain ? "main" : element.props.element;
    let result = [];
    let local = this._locals[elementName];
    if (local) {
      for (let i = 0; i < local.length; i++) {
        if (!this.validateProps(local[i], props)) {
          continue;
        }
        result.push(local[i].className);
      }
    }
    var s = _.trim(result.join(' '));
    return s;
  }

  appendStyle(content, id) {
    let style = document.createElement('style');
    id && style.setAttribute('data-css-id', id);
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  use() {
    if (Platform.OS === 'web') {
      let styles = this._css;
      if (canUseDOM) {
        if (!normalized) {
          normalized = true;
          this.appendStyle(normalize);
        }
        let id = `s${this._id}`;
        cssRefsCounters[id] = (typeof cssRefsCounters[id] !== 'undefined') ? ++cssRefsCounters[id] : 1;
        if (cssRefsCounters[id] === 1) {
          this.appendStyle(styles, id);
        }
      } else {
        //TODO write css file on server
      }
    }

    return this;
  }

  unuse() {
    if (Platform.OS === 'web' && canUseDOM) {
      let id = `s${this._id}`;
      cssRefsCounters[id] = --cssRefsCounters[id];
      if (cssRefsCounters[id] === 0) {
        let style = document.querySelectorAll(`style[data-css-id=\'${id}']`);
        style[0].parentNode.removeChild(style[0]);
      }
    }
    return this;
  }

  buildClassName(id, name) {
    return ['c', this._id.toString(32), id.toString(32), name].join('_');
  }

  buildStyles() {
    let locals = {};
    let styles = this._styles;
    let css = [];
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      for (let name in style) {
        let rule = style[name];
        if (name.startsWith("$")) {
          continue;
        }
        if (!locals[name]) {
          locals[name] = [];
        }
        let local = {
          className: this.buildClassName(i, name)
        };
        if (style.$props) {
          local.$props = style.$props;
        }
        locals[name].push(local);
        if (Platform.OS === 'web') {
          let cssRule = {};
          for (let prop in rule) {
            let styleToWeb = Style.stylesToWeb[prop];
            if (styleToWeb) {
              Object.assign(cssRule, styleToWeb(rule[prop]));
            } else {
              cssRule[prop] = rule[prop];
            }
          }
          css.push(`.${local.className} {${CSSPropertyOperations.createMarkupForStyles(cssRule)}}\n`);
        }
      }
    }
    this._locals = locals;
    if (Platform.OS === 'web') {
      this._css = css.join('');
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

  toString() {
    return this._css;
  }
}
