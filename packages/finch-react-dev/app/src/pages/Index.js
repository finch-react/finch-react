import React, {Component, PropTypes} from 'react';
import fetch from '../lib/fetch';
import Page from '../lib/Page';
import RedditList from '../components/RedditList';
import TabBar from '../components/TabBar';

export default class extends Page {

  styles = require('./index.css');

  static model(params) {
    let list = params.list || 'top';
    const lists = {
      'top': 'https://www.reddit.com/top.json?limit=30',
      'hot': 'https://www.reddit.com/hot.json?limit=30',
      'new': 'https://www.reddit.com/new.json?limit=30'
    };
    return fetch(lists[list]).then(response => response.json())
  };
  render() {
    console.log('Render', this.state.model);
    // const {container, main} = this.styles.locals;
    return (
      <div>
        <div>
          { this.state.model && this.state.model.data && <RedditList items={this.state.model.data.children} /> }
        </div>
        <TabBar/>
      </div>
    );
  }
}
