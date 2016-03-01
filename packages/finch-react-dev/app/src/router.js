import FinchReactRouting from 'finch-react-routing';
let { routerFactory } = FinchReactRouting;

export default routerFactory({
  'error': require('./pages/Error'),
  '/:list?': require('./pages/Index'),
  '/comments/:id/:sort?': require('./pages/Post'),
});
