<<<<<<< Updated upstream
import { routerFactory } from 'finch-react-core';
=======
<<<<<<< Updated upstream
import { routerFactory } from 'finch-react-core';
=======
import FinchReactCore from 'finch-react-core';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export default FinchReactCore.routerFactory({
  'error': require('./pages/Error'),
  '/:list?': require('./pages/Index'),
  '/comments/:id/:sort?': require('./pages/Post'),
});
