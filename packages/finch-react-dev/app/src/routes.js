import Routes from './lib/Routes';

export default new Routes({
  '/:list?': 'Index',
  'error': 'Error',
  '/comments/:id/:sort?': 'Post',
});
