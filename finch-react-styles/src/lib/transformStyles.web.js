export default {
  flex: (value)=>({
    flex: value,
    display: 'flex',
  }),
  shadowOpacity: (value, rule) => ({
    boxShadow: `${(rule.shadowOffset) ? rule.shadowOffset.width : 0}px ${(rule.shadowOffset) ? rule.shadowOffset.height : -3}px ${rule.shadowRadius || 10}px ${rule.shadowColor || 'rgba(0,0,0,' + value + ')'}`
  }),
  shadowOffset: () => null,
  shadowRadius: () => null,
  shadowColor: () => null,
  paddingVertical: (value) => ({
    paddingTop: value,
    paddingBottom: value
  }),
  paddingHorizontal: (value) => ({
    paddingLeft: value,
    paddingRight: value
  }),
  marginVertical: (value) => ({
    marginTop: value,
    marginBottom: value
  }),
  marginHorizontal: (value) => ({
    marginLeft: value,
    marginRight: value
  }),
};
