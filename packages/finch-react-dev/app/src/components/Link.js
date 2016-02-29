import React from 'react-native';
let { Text, Linking, LinkingIOS } = React;
import WebLink from './Link.web';

if (!Linking) {
  Linking = {
    ...LinkingIOS,
    openURL: (url)=>new Promise((resolve, reject)=> {
      LinkingIOS.canOpenURL(url, (supported)=>{
        if (supported) {
          LinkingIOS.openURL(url);
        } else {
          reject();
        }
      });
    })
  };
}

export default class Link extends WebLink {
  render() {
    return (
      <Text {...this.props} onPress={this.onPress.bind(this)}>
        {this.props.children}
      </Text>
    );
  }

  onPress() {
    this.props.href && Linking.openURL('finch://' + this.props.href).catch(err => console.error('An error occurred', err));
    console.log(`iOS Link pressed ${this.props.href}`);
  }
}
