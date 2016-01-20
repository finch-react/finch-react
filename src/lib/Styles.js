import Themes from './Themes';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';
import React, {Platform} from 'react-native';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';

let cssStyleId = 0;
let cssRefsCounters = {};

export default class Styles {
  static create(s) {
    if (!s.hasOwnProperty('_id')) {
      s._ref = new Styles(s);
    }
    return s._ref;
  }

  static linkRefs(styles, element, props, context, theme, isMain) {
    let ref = isMain ? 'main' : element.ref;
    let extraProps = {};

    if (Platform.OS !== 'web') {
      extraProps.style = styles.getStyle(ref, props, theme);
    } else {
      var classes = styles.getClassNames(ref, props, theme).join(' ');
      if (classes.length > 0) {
        extraProps.className = _.trim((element.props.className ? element.props.className : '') + ' ' + classes);
      }
    }

    extraProps.style = {...extraProps.style, ...element.props.style};

    let newChildren =
      React.isValidElement(element.props.children)
        ?
        Styles.linkRefs(styles, React.Children.only(element.props.children), props, context, theme, false)
        :
        React.Children.map(element.props.children, childElement =>
          React.isValidElement(childElement)
            ?
            Styles.linkRefs(styles, childElement, props, context, theme, false)
            :
            childElement
        );

    return React.cloneElement(element, extraProps, newChildren);
  }

  constructor(s) {
    invariant((_.isPlainObject(s) || _.isFunction(s) || _.isArrayLike(s)),
      'Style must be plain object, function or array');

    s._id = cssStyleId++;
    this._raw = s;
    this._styles = [];
    this._initStyles(this._raw);
  }

  use(themeName) {
    let theme = Themes.get(themeName);
    this._raw._uses = this._raw._uses || {};
    this._raw._uses[theme._id] = this._raw._uses[theme._id] || {};
    this._raw._uses[theme._id].count = this._raw._uses[theme._id].count || 0;
    if (++this._raw._uses[theme._id].count === 1) {
      this._build(this._raw._uses[theme._id], theme);
    }

    if (Platform.OS === 'web') {
      let styles = this._stylesToString(themeName);
      if (canUseDOM) {
        let id = `s${this._raw._id}t${theme._id}`;
        cssRefsCounters[id] = (typeof cssRefsCounters[id] !== 'undefined') ? ++cssRefsCounters[id] : 1;
        if (cssRefsCounters[id] === 1) {
          let style = document.createElement('style');
          style.setAttribute('data-css-id', id);
          style.type = 'text/css';
          style.innerHTML = styles;
          document.getElementsByTagName('head')[0].appendChild(style);
        }
      } else {
        // write css file
      }
    }
    return this;
  }

  _build(context, theme) {
    let style = {};
    for (let i = 0; i < this._styles.length; i++) {
      let themedStylesChunk = this._styles[i](theme);
      for (let refStyle in themedStylesChunk) {
        if (refStyle.startsWith('_')) {
          continue;
        }
        let split = refStyle.split(':');
        style[split[0]] = style[split[0]] || {
          local: this._buildClassName(split[0], this._raw._id, theme._id),
          styles: {},
          conditionStyles: []
        };
        if (split.length === 1) {
          style[split[0]].styles = {...style[split[0]].styles, ...themedStylesChunk[refStyle]};
        } else {
          for (let j = 1; j < split.length; j++) {
            let conditionalRef = split[j].split('-');
            let conditionalStyle = {
              local: this._buildClassName(split[0] + '__' + split[j], this._raw._id, theme._id),
              not: conditionalRef[0] === 'not',
              name: conditionalRef[1],
              value: typeof conditionalRef[2] !== 'undefined' ? conditionalRef[2] : true,
              style: themedStylesChunk[refStyle]
            };
            style[split[0]].conditionStyles.push(conditionalStyle);
          }
        }
      }
    }
    this._raw._uses[theme._id]._style = style;
  }

  _buildClassName(name, stylesId, themeId) {
    return (`s${stylesId}__t${themeId}__${name}`).replace('-', '_');
  }

  _initStyles(styles) {
    if (_.isFunction(styles)) {
      this._styles.push(styles);
    } else if (_.isPlainObject(styles)) {
      this._styles.push(()=>styles);
    } else if (_.isArrayLike(styles)) {
      for (let i = 0; i < styles.length; i++) {
        this._initStyles(styles[i]);
      }
    }
  }

  getStyle(name, props, themeName) {
    let theme = Themes.get(themeName);
    let style = this._raw._uses[theme._id]._style[name];
    let result = {};
    if (style) {
      result = style.styles;
      for (let conditionStyle of style.conditionStyles) {
        if (conditionStyle.not) {
          if ((!props.hasOwnProperty(conditionStyle.name))) {
            result = {...result, ...conditionStyle.style};
          }
        } else if (props.hasOwnProperty(conditionStyle.name) && props[conditionStyle.name] === conditionStyle.value) {
          result = {...result, ...conditionStyle.style};
        }
      }
    }
    return result;
  }

  getClassNames(name, props, themeName) {
    let theme = Themes.get(themeName);
    let style = this._raw._uses[theme._id]._style[name];
    let classNames = [];
    if (style) {
      classNames.push(style.local);
      for (let conditionStyle of style.conditionStyles) {
        if (conditionStyle.not) {
          if ((!props.hasOwnProperty(conditionStyle.name))) {
            classNames.push(conditionStyle.local);
          }
        } else if (props.hasOwnProperty(conditionStyle.name) && props[conditionStyle.name] === conditionStyle.value) {
          classNames.push(conditionStyle.local);
        }
      }
    }
    return _.uniq(classNames);
  }

  _stylesToString(themeName) {
    let styles = [];
    let theme = Themes.get(themeName);
    let style = this._raw._uses[theme._id]._style;
    for (let styleKey in style) {
      if (styleKey.startsWith('_')) {
        continue;
      }
      let styleVal = style[styleKey];
      styles.push(`.${styleVal.local}{`);
      styles.push(CSSPropertyOperations.createMarkupForStyles(styleVal.styles));
      styles.push('}\n');
      for (let conditionStyleKey in styleVal.conditionStyles) {
        let conditionStyle = styleVal.conditionStyles[conditionStyleKey];
        styles.push(`.${conditionStyle.local}{`);
        styles.push(CSSPropertyOperations.createMarkupForStyles(conditionStyle.style));
        styles.push('}\n');
      }
    }
    return styles.join('');
  }


  unuse(themeName) {
    let theme = Themes.get(themeName);
    if (Platform.OS === 'web' && canUseDOM) {
      let id = `s${this._raw._id}t${theme._id}`;
      cssRefsCounters[id] = --cssRefsCounters[id];
      if (cssRefsCounters[id] === 0) {
        let style = document.querySelectorAll(`style[data-css-id=\'${id}']`);
        style[0].parentNode.removeChild(style[0]);
      }
    }
  }
}
