import { routerFactory } from 'finch-react-core';

export default routerFactory({
  'error': require('./pages/Error'),
  '/:list?': require('./pages/Index'),
  '/comments/:id/:sort?': require('./pages/Post'),
});
