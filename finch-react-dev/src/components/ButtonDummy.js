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
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 0,
        fontWeight: "normal",
        borderWidth: 1,
        borderColor: 'transparent',
        borderStyle: "solid",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 15,
        borderRadius: 2,
        cursor: "pointer"
      },
    },
    {
      $props: {
        color: "primary"
      },
      main: {
        ...T('button.color.primary')
      }
    },
    {
      $props: {
        color: "default"
      },
      main: {
        ...T('button.color.default')
      }
    },
    {
      $props: {
        color: "success"
      },
      main: {
        ...T('button.color.success')
      }
    },
    {
      $props: {
        color: "info"
      },
      main: {
        ...T('button.color.info')
      }
    },
    {
      $props: {
        color: "warning"
      },
      main: {
        ...T('button.color.warning')
      }
    },
    {
      $props: {
        color: "danger"
      },
      main: {
        ...T('button.color.danger')
      }
    },
    {
      $props: {
        size: "tiny"
      },
      main: {
        ...T('button.size.tiny')
      }
    },
    {
      $props: {
        size: "small"
      },
      main: {
        ...T('button.size.small')
      }
    },
    {
      $props: {
        size: "medium"
      },
      main: {
        ...T('button.size.medium')
      }
    },
    {
      $props: {
        size: "large"
      },
      main: {
        ...T('button.size.large')
      }
    },
    {
      $props: {
        active: true,
        color: "default"
      },
      main: {
        ...T('button.active.default')
      }
    },
    {
      $props: {
        active: true,
        color: "primary"
      },
      main: {
        ...T('button.active.primary')
      }
    },
    {
      $props: {
        active: true,
        color: "success"
      },
      main: {
        ...T('button.active.success')
      }
    },
    {
      $props: {
        active: true,
        color: "info"
      },
      main: {
        ...T('button.active.info')
      }
    },
    {
      $props: {
        active: true,
        color: "warning"
      },
      main: {
        ...T('button.active.warning')
      }
    },
    {
      $props: {
        active: true,
        color: "danger"
      },
      main: {
        ...T('button.active.danger')
      }
    },
    {
      $props: {
        hover: true,
        color: "default"
      },
      main: {
        ...T('button.hover.default')
      }
    },
    {
      $props: {
        hover: true,
        color: "primary"
      },
      main: {
        ...T('button.hover.primary')
      }
    },
    {
      $props: {
        hover: true,
        color: "success"
      },
      main: {
        ...T('button.hover.success')
      }
    },
    {
      $props: {
        hover: true,
        color: "info"
      },
      main: {
        ...T('button.hover.info')
      }
    },
    {
      $props: {
        hover: true,
        color: "warning"
      },
      main: {
        ...T('button.hover.warning')
      }
    },
    {
      $props: {
        hover: true,
        color: "danger"
      },
      main: {
        ...T('button.hover.danger')
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
        <Text props="onClick, onPress, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseOut, onMouseOver, onMouseOut">{this.props.children}</Text>
    );
  }
}

