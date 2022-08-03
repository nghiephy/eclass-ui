import config from '~/config';

// Import Layouts
import { LoginRegisterLayout } from '~/layouts';

// Import Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Stream from '~/pages/Stream';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: LoginRegisterLayout },
    { path: config.routes.register, component: Register, layout: LoginRegisterLayout },
];

const privateRoutes = [
    { path: config.routes.stream, component: Stream },
    { path: config.routes.home, component: Home },
];

export { publicRoutes, privateRoutes };
