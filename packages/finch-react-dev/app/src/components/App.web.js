import React, {
  Component,
  View,
  ScrollView,
  Text
} from 'react-native';
import Button from './Button'
import Post from './Post';
import FinchReactCore from 'finch-react-core';
let {StyledComponent, SwitchTheme} = FinchReactCore;

export default class App extends StyledComponent {
  static defaultProps = {
    open: true
  };

  static styles = {
    main: {
      flexDirection: 'column'
    },
    button: {},
    buttonWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    post: {
      flex: 1,
      padding: 10,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'grey',
      borderStyle: 'solid',
    }
  };

  state = {
    isActive: false
  };

  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (window.hydrated_model) {
        window.hydrated_model.forEach((model)=>{
          console.log("Hydrate " + JSON.stringify(model));
          this.setState(model);
        });
        window.hydrate = (model) => {
          console.log("Hydrate " + JSON.stringify(model));
          this.setState(model);
        }
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <Post element="post"/>
        <Post element="post"/>
        <Post element="post"/>
      </ScrollView>
    );
  }
}
