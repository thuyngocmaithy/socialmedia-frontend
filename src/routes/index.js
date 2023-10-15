import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';

//Login
import Register from '../Register/Register';
import Login from '../Register/Login';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.register, component: Register },
    { path: config.routes.login, component: Login },
];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };