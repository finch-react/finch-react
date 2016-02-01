import React, {
  PropTypes,
  Component,
  View,
  Text
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let {StyledComponent} = FinchReactStyles;

export default class ButtonDummy extends StyledComponent {
  static COLORS = ["default", "primary", "success", "info", "warning", "danger"];
  static SIZES = ["tiny", "small", "medium", "large"];
  static FLEX = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  static propTypes = {
    color: PropTypes.oneOf(ButtonDummy.COLORS),
    size: PropTypes.oneOf(ButtonDummy.SIZES),
    flex: PropTypes.oneOf(ButtonDummy.FLEX),
    onClick: PropTypes.func,
    onPress: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    color: "default",
    size: "medium"
  };

  static styles = T => [
    {
      main: {
        justifyContent: "center",
        marginBottom: 0,
        borderWidth: 1,
        borderColor: 'transparent',
        borderStyle: "solid",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 2,
        cursor: "pointer"
      },
      buttonText: {
        textAlign: "center",
        fontWeight: "normal",
        fontSize: 15,
      }
    },
    ...ButtonDummy.COLORS.map(color=>(
    {
      $props: {
        color: color
      },
      main: {
        ...T(`button.color.${color}`)
      },
      buttonText: {
        ...T(`button.color.${color}Text`)
      }
    }
    )),
    ...ButtonDummy.COLORS.map(color=>(
    {
      $props: {
        active: true,
        color: color
      },
      main: {
        ...T(`button.active.${color}`)
      },
      buttonText: {
        ...T(`button.active.${color}Text`)
      }
    }
    )),
    ...ButtonDummy.COLORS.map(color=>(
    {
      $props: {
        hover: true,
        color: color
      },
      main: {
        ...T(`button.hover.${color}`)
      },
      buttonText: {
        ...T(`button.hover.${color}Text`)
      }
    }
    )),
    ...ButtonDummy.SIZES.map(size=>(
    {
      $props: {
        size: size
      },
      main: {
        ...T(`button.size.${size}`)
      },
      buttonText: {
        ...T(`button.size.${size}Text`)
      },
    }
    )),
    ...ButtonDummy.FLEX.map(flex => (
    {
      $props: {
        flex: flex,
      },
      main: {
        flex: flex
      }
    }
    )),
  ];

  render() {
    return (
      <View
        props="onClick, onPress, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseOut, onMouseOver, onMouseOut">
        <Text element="buttonText">{this.props.children}</Text>
      </View>
    );
  }
}

