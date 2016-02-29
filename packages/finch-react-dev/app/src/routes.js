export default {
  '/:list?': require('./pages/Index'),
  'error': require('./pages/Error'),
  '/comments/:id/:sort?': require('./pages/Post'),
}
