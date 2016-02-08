export default class With {
  with(props) {
    let copy = new this.constructor();
    Object.assign(copy, this, props);
    return copy;
  }
}
