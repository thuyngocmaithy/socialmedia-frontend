import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';
import UserProfile from '../pages/User/UserProfile/UserProfile';
import PrivateUserPage from '../pages/User/PrivateUserPage/PrivateUserPage';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.user, component: UserProfile },
    { path: config.routes.userPrivate, component: PrivateUserPage }

];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
