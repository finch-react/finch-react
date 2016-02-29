import Routes from './lib/Routes';

export default new Routes({
  'error': require('./pages/Error'),
  '/:list?': require('./pages/Index'),
  '/comments/:id/:sort?': require('./pages/Post'),
});
