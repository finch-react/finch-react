import {PropTypes, Component} from "react";

function transformStyles(e, styles, i) {
  if(Array.isArray(e)) {
    return e.map((e, i)=>transformStyles(e, styles, i));
  }
  if (!(typeof e == "object")) {
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
  return React.cloneElement(e,
    {
      key: i,
      className: e.props.className && e.props.className
        .split(' ')
        .map(name => styles.locals[name] ? styles.locals[name] : name)
        .join(' ')
    },
    children
  );
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
    if (this.context.onServerStyle) {
      this.styles && this.context.onServerStyle(this.styles)
    } else {
      this.styles && this.styles.use();
    }
  }

  componentWillUnmount() {
    this.styles && this.styles.unuse();
  }

}

