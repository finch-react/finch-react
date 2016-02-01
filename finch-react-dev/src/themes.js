import FinchReactStyles from 'finch-react-styles';
let {Theme} = FinchReactStyles;

Theme.register({
  brandColorDefault: "red",
  brandColorAccent: "red",

  headerColor: T=>T("brandColorAccent", "black"),

  button: {
    color: {
      primary: {
        backgroundColor: "#2d9fd8",
        borderColor: "#2591c7"
      },
      primaryText: {
        color: "#fff",
      },
      default: {
        shadowOpacity: 1,
        backgroundColor: "#fff",
        borderColor: "#e7e9ed"
      },
      defaultText: {
        color: "#54565b",
      },
      success: {
        shadowOpacity: 1,
        shadowColor: '#f00',
        shadowOffset: {
          width: 1,
          height: -3
        },
        backgroundColor: "#2faa60",
        borderColor: "#299655"
      },
      successText: {
        color: "#fff",
      },
      info: {
        backgroundColor: "#2d9fd8",
        borderColor: "#2591c7"
      },
      infoText: {
        color: "#fff",
      },
      warning: {
        backgroundColor: "#e75e40",
        borderColor: "#e44b29"
      },
      warningText: {
        color: "#fff",
      },
      danger: {
        backgroundColor: "#e52c5a",
        borderColor: "#dc1b4b"
      },
      dangerText: {
        color: "#fff",
      },
    },
    size: {
      tiny: {
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 2,
      },
      tinyText: {
        fontSize: 13,
      },
      small: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
      },
      smallText: {
        fontSize: 13,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 9,
      },
      mediumText: {
        fontSize: 15,
      },
      large: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 2,
      },
      largeText: {
        fontSize: 19,
      },
    },
    active: {
      default: {
        backgroundColor: "#e6e6e6",
        borderColor: "#c4c9d3",
      },
      defaultText: {
        color: "#54565b",
      },
      primary: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
      },
      primaryText: {
        color: "#fff",
      },
      success: {
        backgroundColor: "#248249",
        borderColor: "#1c663a",
      },
      successText: {
        color: "#fff",
      },
      info: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
      },
      infoText: {
        color: "#fff",
      },
      warning: {
        backgroundColor: "#d93d1b",
        borderColor: "#b93417",
      },
      warningText: {
        color: "#fff",
      },
      danger: {
        backgroundColor: "#c61843",
        borderColor: "#a61439",
      },
      dangerText: {
        color: "#fff",
      },
    },
    hover: {
      default: {
        color: "#54565b",
        backgroundColor: "#e6e6e6",
        borderColor: "#c4c9d3",
      },
      defaultText: {
        color: "#54565b",
      },
      primary: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
      },
      primaryText: {
        color: "#fff",
      },
      success: {
        backgroundColor: "#248249",
        borderColor: "#1c663a",
      },
      successText: {
        color: "#fff",
      },
      info: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
      },
      infoText: {
        color: "#fff",
      },
      warning: {
        backgroundColor: "#d93d1b",
        borderColor: "#b93417",
      },
      warningText: {
        color: "#fff",
      },
      danger: {
        backgroundColor: "#c61843",
        borderColor: "#a61439",
      },
      dangerText: {
        color: "#fff",
      },
    }
  },
});

Theme.override("dark", {
  brandColorAccent: "blue"
});




