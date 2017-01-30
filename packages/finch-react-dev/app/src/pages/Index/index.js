import {Component, PropTypes} from 'react';
import fetch from '../../lib/fetch';
import Page from '../../lib/Page';
import RedditList from '../../components/RedditList/index';
import TabBar from '../../components/TabBar/index';
import Preloader from '../../components/Preloader/index';

export default class extends Page {

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
    console.log('Render', this.props.request.params);
    return (
      <div>
        <div>
          { this.state.model && this.state.model.data ? <RedditList items={this.state.model.data.children}/> : <Preloader/>}
        </div>
        <TabBar/>
      </div>
    );
  }
}