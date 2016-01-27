import FinchReactStyles from 'finch-react-styles';
let {Theme} = FinchReactStyles;

Theme.register({
  brandColorDefault: "red",
  brandColorAccent: "blue"
});

Theme.register({
  brandColorAccent: "green",
  dom2: {
    "headerColor": $=>$("brandColorAccent", "black")
  }
});

Theme.override("dark", {
  brandColorAccent: "blue"
});




