import FinchReactStyles from 'finch-react-styles';
let {Theme} = FinchReactStyles;

Theme.register({
  brandColorDefault: "red",
  brandColorAccent: "red",

  headerColor: T=>T("brandColorAccent", "black"),

  button: {
    color: {
      primary: {
        color: "#fff",
        backgroundColor: "#2d9fd8",
        borderColor: "#2591c7"
      },
      default: {
        color: "#54565b",
        backgroundColor: "#fff",
        borderColor: "#e7e9ed"
      },
      success: {
        color: "#fff",
        backgroundColor: "#2faa60",
        borderColor: "#299655"
      },
      info: {
        color: "#fff",
        backgroundColor: "#2d9fd8",
        borderColor: "#2591c7"
      },
      warning: {
        color: "#fff",
        backgroundColor: "#e75e40",
        borderColor: "#e44b29"
      },
      danger: {
        color: "#fff",
        backgroundColor: "#e52c5a",
        borderColor: "#dc1b4b"
      }
    },
    size: {
      tiny: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        fontSize: 13,
        borderRadius: 2,
      },
      small: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 13,
        borderRadius: 2,
      },
      medium: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
        fontSize: 15,
        borderRadius: 2,
      },
      large: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 19,
        borderRadius: 2,
      },
    },
    active: {
      default: {
        color: "#54565b",
        backgroundColor: "#e6e6e6",
        borderColor: "#c4c9d3",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      primary: {
        color: "#fff",
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      success: {
        color: "#fff",
        backgroundColor: "#248249",
        borderColor: "#1c663a",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      info: {
        color: "#fff",
        backgroundColor: "#2181b1",
        borderColor: "#1b6b93",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      warning: {
        color: "#fff",
        backgroundColor: "#d93d1b",
        borderColor: "#b93417",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
      danger: {
        color: "#fff",
        backgroundColor: "#c61843",
        borderColor: "#a61439",
        boxShadow: "inset 0 3px 5px rgba(0,0,0,.125)"
      },
    }
  },
});

Theme.override("dark", {
  brandColorAccent: "blue"
});




