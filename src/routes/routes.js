import config from '~/config';

// Import Layouts
import { LoginRegisterLayout } from '~/layouts';
import { HomeLayout } from '~/layouts';

// Import Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import Stream from '~/pages/Stream';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: LoginRegisterLayout },
    { path: config.routes.register, component: Register, layout: LoginRegisterLayout },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: LoginRegisterLayout },
];

const privateRoutes = [
    { path: config.routes.stream, component: Stream },
    { path: config.routes.home, component: Home, layout: HomeLayout },
];

export { publicRoutes, privateRoutes };
