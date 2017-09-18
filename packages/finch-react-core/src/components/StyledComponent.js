import {PropTypes, Component} from "react";

function transformStyles(e, styles, i) {
  if (Array.isArray(e)) {
    return e.map((e, i) => transformStyles(e, styles, i));
  }
  if (typeof e !== "object" || e === null) {
    return e;
  }
  let children = e.props.children;
  if (children && typeof children != "string" && typeof children != "number") {
    if (children.$$typeof) {
      children = transformStyles(children, styles);
    } else {
      children = children.map((c, i) => transformStyles(c, styles, i))
    }
  }

  let className = e.props.className || '';

  className = (typeof className === "string" ? className.split(' ') : className)
    .filter(e => e)
    .map(name => (styles.locals && styles.locals[name]) ? styles.locals[name] : name)
    .join(' ');

  try {
    return React.cloneElement(e,
      {
        key: e.key !== null ? e.key : i,
        className: className
      },
      children
    );
  }
  catch(err) {
    console.log("React.cloneElement Error: ", err);
    return null
  }
}

export default class StyledComponent extends Component {

  static contextTypes = {
    onServerStyle: PropTypes.func
  };

  constructor() {
    super();
    const render = this.render;
    this.render = () => {
      if (!this.styles) {
        return render.apply(this);
      }
      return transformStyles(render.apply(this), this.styles);
    }

  }

  componentWillMount() {
    if (this.context && this.context.onServerStyle) {
      this.styles && this.context.onServerStyle(this.styles)
    }
    else if (this.props.context && this.props.context.onServerStyle) {
      this.styles && this.props.context.onServerStyle(this.styles)
    }
    else {
      this.styles && this.styles.use();
    }
  }

  componentWillUnmount() {
    this.styles && this.styles.unuse();
  }

}

