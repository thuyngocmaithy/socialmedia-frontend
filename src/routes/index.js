import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';
import Board from '../pages/Board';
import Profile, { PinCreated, PinSaved } from '../pages/Profile';
import InfoProfile from '../pages/Settings/InfoProfile';
import AccountSetting from '../pages/Settings/AccountSetting';
import ChangePassword from '../pages/Settings/ChangePassword';
import { Register } from '../pages/Account';
import { Login } from '../pages/Account';

// Layout
import { RegisterLayout } from '../layouts';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.pinCreatedOfUser, component: PinCreated },
    { path: config.routes.pinSavedOfUser, component: PinSaved },
    { path: config.routes.board, component: Board },
    { path: config.routes.infoProfile, component: InfoProfile },
    { path: config.routes.accountSetting, component: AccountSetting },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.register, component: Register, layout: RegisterLayout },
    { path: config.routes.login, component: Login, layout: RegisterLayout },
];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
