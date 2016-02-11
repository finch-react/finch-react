import React, {Component} from 'react';

export default class extends Component {
  render() {
    return (<div>{this.props.state.statusCode}: {this.props.state.path}</div>);
  }
}

//var FetchStream = require("fetch").FetchStream;
//var fetch = new FetchStream("http://localhost:5000", {
//  headers: {
//    'Accept': 'application/json'
//  }
//});
//fetch.on("data", function(chunk){
//  console.log("!!!!!!!!!!!!");
//  console.log(chunk.toString('utf-8'));
//});
