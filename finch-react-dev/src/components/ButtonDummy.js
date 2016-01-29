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
    color: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),
    size: PropTypes.oneOf(["tiny", "small", "medium", "large"]),
    flex: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
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
    {
      $props: {
        color: "primary"
      },
      main: {
        ...T('button.color.primary')
      },
      buttonText: {
        ...T('button.color.primaryText')
      }
    },
    {
      $props: {
        color: "default"
      },
      main: {
        ...T('button.color.default')
      },
      buttonText: {
        ...T('button.color.defaultText')
      }
    },
    {
      $props: {
        color: "success"
      },
      main: {
        ...T('button.color.success')
      },
      buttonText: {
        ...T('button.color.successText')
      }
    },
    {
      $props: {
        color: "info"
      },
      main: {
        ...T('button.color.info')
      },
      buttonText: {
        ...T('button.color.infoText')
      }
    },
    {
      $props: {
        color: "warning"
      },
      main: {
        ...T('button.color.warning')
      },
      buttonText: {
        ...T('button.color.warningText')
      }
    },
    {
      $props: {
        color: "danger"
      },
      main: {
        ...T('button.color.danger')
      },
      buttonText: {
        ...T('button.color.dangerText')
      }
    },
    {
      $props: {
        size: "tiny"
      },
      main: {
        ...T('button.size.tiny')
      },
      buttonText: {
        ...T('button.size.tinyText')
      },
    },
    {
      $props: {
        size: "small"
      },
      main: {
        ...T('button.size.small')
      },
      buttonText: {
        ...T('button.size.smallText')
      },
    },
    {
      $props: {
        size: "medium"
      },
      main: {
        ...T('button.size.medium')
      },
      buttonText: {
        ...T('button.size.mediumText')
      },
    },
    {
      $props: {
        size: "large"
      },
      main: {
        ...T('button.size.large')
      },
      buttonText: {
        ...T('button.size.largeText')
      },
    },
    {
      $props: {
        active: true,
        color: "default"
      },
      main: {
        ...T('button.active.default')
      },
      buttonText: {
        ...T('button.active.defaultText')
      },
    },
    {
      $props: {
        active: true,
        color: "primary"
      },
      main: {
        ...T('button.active.primary')
      },
      buttonText: {
        ...T('button.active.primaryText')
      },
    },
    {
      $props: {
        active: true,
        color: "success"
      },
      main: {
        ...T('button.active.success')
      },
      buttonText: {
        ...T('button.active.successText')
      },
    },
    {
      $props: {
        active: true,
        color: "info"
      },
      main: {
        ...T('button.active.info')
      },
      buttonText: {
        ...T('button.active.infoText')
      },
    },
    {
      $props: {
        active: true,
        color: "warning"
      },
      main: {
        ...T('button.active.warning')
      },
      buttonText: {
        ...T('button.active.warningText')
      },
    },
    {
      $props: {
        active: true,
        color: "danger"
      },
      main: {
        ...T('button.active.danger')
      },
      buttonText: {
        ...T('button.active.dangerText')
      },
    },
    {
      $props: {
        hover: true,
        color: "default"
      },
      main: {
        ...T('button.hover.default')
      },
      buttonText: {
        ...T('button.hover.defaultText')
      },
    },
    {
      $props: {
        hover: true,
        color: "primary"
      },
      main: {
        ...T('button.hover.primary')
      },
      buttonText: {
        ...T('button.hover.primaryText')
      },
    },
    {
      $props: {
        hover: true,
        color: "success"
      },
      main: {
        ...T('button.hover.success')
      },
      buttonText: {
        ...T('button.hover.successText')
      },
    },
    {
      $props: {
        hover: true,
        color: "info"
      },
      main: {
        ...T('button.hover.info')
      },
      buttonText: {
        ...T('button.hover.infoText')
      },
    },
    {
      $props: {
        hover: true,
        color: "warning"
      },
      main: {
        ...T('button.hover.warning')
      },
      buttonText: {
        ...T('button.hover.warningText')
      },
    },
    {
      $props: {
        hover: true,
        color: "danger"
      },
      main: {
        ...T('button.hover.danger')
      },
      buttonText: {
        ...T('button.hover.dangerText')
      },
    },
    {
      $props: {
        flex: "1",
      },
      main: {
        ...T('button.flex.f1')
      }
    },
    {
      $props: {
        flex: "2",
      },
      main: {
        ...T('button.flex.f2')
      }
    },
    {
      $props: {
        flex: "3",
      },
      main: {
        ...T('button.flex.f3')
      }
    },
    {
      $props: {
        flex: "4",
      },
      main: {
        ...T('button.flex.f4')
      }
    },
    {
      $props: {
        flex: "5",
      },
      main: {
        ...T('button.flex.f5')
      }
    },
    {
      $props: {
        flex: "6",
      },
      main: {
        ...T('button.flex.f6')
      }
    },
    {
      $props: {
        flex: "7",
      },
      main: {
        ...T('button.flex.f7')
      }
    },
    {
      $props: {
        flex: "8",
      },
      main: {
        ...T('button.flex.f8')
      }
    },
    {
      $props: {
        flex: "1",
      },
      main: {
        ...T('button.flex.f1')
      }
    },
    {
      $props: {
        flex: "9",
      },
      main: {
        ...T('button.flex.f9')
      }
    },
    {
      $props: {
        flex: "10",
      },
      main: {
        ...T('button.flex.f10')
      }
    },
    {
      $props: {
        flex: "11",
      },
      main: {
        ...T('button.flex.f11')
      }
    },
    {
      $props: {
        flex: "12",
      },
      main: {
        ...T('button.flex.f12')
      }
    },

  ];

  render() {
    return (
      <View props="onClick, onPress, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseOut, onMouseOver, onMouseOut">
        <Text element="buttonText">{this.props.children}</Text>
      </View>
    );
  }
}

