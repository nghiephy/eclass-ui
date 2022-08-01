import config from '~/config';

// Import Layouts

// Import Pages
import Login from '~/pages/Login';
import Stream from '~/pages/Stream';

const publicRoutes = [{ path: config.routes.login, component: Login }];

const privateRoutes = [{ path: config.routes.stream, component: Stream }];

export { publicRoutes, privateRoutes };
