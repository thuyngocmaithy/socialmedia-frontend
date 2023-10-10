import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';
import UserProfile from '../pages/User/UserProfile/UserProfile';
import PrivateUserPage from '../pages/User/PrivateUserPage/PrivateUserPage';
import User from '../pages/User/User';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.userProfile, component: UserProfile },
    { path: config.routes.userPrivate, component: PrivateUserPage },
    { path: config.routes.userProfile, component: User }

];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
