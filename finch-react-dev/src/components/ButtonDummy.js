import React, {
  PropTypes,
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent} = FinchReactStyles;

export default class ButtonDummy extends StyledComponent {
  static propTypes = {
    inline: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    inline: false
  };

  static styles = T => [
    {
      main: {
        flex: 1,
        marginBottom: 0,
        fontWeight: "normal",
        textAlign: "center",
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
      }
    },
    {
      $props: {
        inline: true
      },
      main: {
      }
    },
  ];

  render() {
    return (
        <Text props="onClick, onPress">{this.props.children}</Text>
    );
  }
}

