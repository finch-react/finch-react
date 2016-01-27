export default $=>[
  {
    text: {
      color: "red"
    },
    button: {
      color: "red"
    }
  },
  {
    $props: props => props.open,
    text: {
      color: "green"
    }
  },
  {
    $props: {
      open: true
    },
    text: {
      color: "blue"
    }
  },
];
