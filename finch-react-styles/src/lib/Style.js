import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';
import {Platform} from 'react-native';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

let styleId = -1;

let normalize = `
  .view {
    position:relative;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
   }
`;


export default class Style {
  cssRefsCounter = 0;

  static stylesToWeb = {
    flex: (value)=>({
      flex: value,
      display: 'flex'
    })
  };

  static stylesToMobile = {
    cursor: (value) => null,
    display: (value) => null
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

  static appendStyle(content, id, onServerStyle) {
    if (!content || !id) {
      return;
    }
    if (canUseDOM) {
      let style = document.createElement('style');
      id && style.setAttribute('data-css-id', id);
      style.type = 'text/css';
      style.innerHTML = content;
      document.getElementsByTagName('head')[0].appendChild(style);
    } else {
      if (onServerStyle) {
        onServerStyle(id, content);
      }
    }
  }

  use(context) {
    console.log("Style.use")
    if (Platform.OS === 'web') {
      //TODO грабли
      if (canUseDOM) {
        if (!document.querySelectorAll("style[data-css-id='normalize']")[0]) {
          Style.appendStyle(normalize, "normalize", context.onServerStyle);
        }
      } else {
        Style.appendStyle(normalize, "normalize", context.onServerStyle);
      }
      // end грабли
      let styles = this._css;
      let id = `s${this._id}`;
      this.cssRefsCounter++;
      if (this.cssRefsCounter === 1) {
        Style.appendStyle(styles, id, context.onServerStyle);
      }
      if (!canUseDOM) {
        this.unuse();
      }
    }

    return this;
  }

  unuse() {
    console.log("style.unuse")
    if (Platform.OS === 'web' && canUseDOM) {
      let id = `s${this._id}`;
      this.cssRefsCounter--;
      if (this.cssRefsCounter === 0) {
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
        } else {
          let mobileRule = {};
          Object.keys(rule).map((name)=>{
            let result = rule[name];
            if (Style.stylesToMobile[name]) {
              result = Style.stylesToMobile[name](result);
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
