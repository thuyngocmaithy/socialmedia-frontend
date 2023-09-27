import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
