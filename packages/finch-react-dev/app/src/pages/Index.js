import {Component, PropTypes} from 'react';
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
    console.log("Index model");
    return fetch(lists[list])
      .then(response => response.json())
      .then(json => {
        console.log("Index model ok", Object.keys(json).length);
        return json;
      })
  };

  render() {
    console.log('Render', this.props.request.params.list);
    // const {container, main} = this.styles.locals;
    return (
      <div>
        <div>
          { this.state.model && this.state.model.data && <RedditList items={this.state.model.data.children}/> }
        </div>
        <TabBar/>
      </div>
    );
  }
}
