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
        backgroundColor: "#fff",
        borderColor: "#e7e9ed"
      },
      defaultText: {
        color: "#54565b",
      },
      success: {
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
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: 2,
      },
      tinyText: {
        fontSize: 13,
      },
      small: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 2,
      },
      smallText: {
        fontSize: 13,
      },
      medium: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
      },
      mediumText: {
        fontSize: 15,
      },
      large: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
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
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      defaultText: {
        color: "#54565b",
      },
      primary: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      primaryText: {
        color: "#fff",
      },
      success: {
        backgroundColor: "#248249",
        borderColor: "#1c663a",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      successText: {
        color: "#fff",
      },
      info: {
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      infoText: {
        color: "#fff",
      },
      warning: {
        backgroundColor: "#d93d1b",
        borderColor: "#b93417",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      warningText: {
        color: "#fff",
      },
      danger: {
        backgroundColor: "#c61843",
        borderColor: "#a61439",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
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
    },
    flex: {
      f1: {
        flex: 1
      },
      f2: {
        flex: 2
      },
      f3: {
        flex: 3
      },
      f4: {
        flex: 4
      },
      f5: {
        flex: 5
      },
      f6: {
        flex: 6
      },
      f7: {
        flex: 7
      },
      f8: {
        flex: 8
      },
      f9: {
        flex: 9
      },
      f10: {
        flex: 10
      },
      f11: {
        flex: 11
      },
      f12: {
        flex: 12
      },
    }
  },
});

Theme.override("dark", {
  brandColorAccent: "blue"
});




