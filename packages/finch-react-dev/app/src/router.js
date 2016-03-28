import FinchReactCore from 'finch-react-core';

export default FinchReactCore.routerFactory({
  'error': require('./pages/Error'),
  '/:list?': require('./pages/Index'),
  '/comments/:id/:sort?': require('./pages/Post'),
});
