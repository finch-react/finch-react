import decorateInstance from '../lib/decorateInstance';
import React, { Component } from 'react';

export default class StyledComponent extends Component {
  static contextTypes = {
    theme: React.PropTypes.object,
    onServerStyle: React.PropTypes.func
  };

  constructor(...args) {
    super(...args);
    decorateInstance(this);
  }
};
