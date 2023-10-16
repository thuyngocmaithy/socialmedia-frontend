import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';
import Board from '../pages/Board';
import Profile, { PinCreated, PinSaved } from '../pages/Profile';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.pinCreatedOfUser, component: PinCreated },
    { path: config.routes.pinSavedOfUser, component: PinSaved },
    { path: config.routes.board, component: Board },
];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
