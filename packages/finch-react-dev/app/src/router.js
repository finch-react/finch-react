import FinchReactCore from 'finch-react-core';

export default FinchReactCore.routerFactory({
  'error': 'Error',
  '/:list?': 'Index',
  '/comments/:id/:sort?': 'Post'
});
