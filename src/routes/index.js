import config from '../config';

// Pages
import Home from '../pages/Home';
import Create from '../pages/Create';
import Board from '../pages/Board';
import DisplayPin from '../pages/Pin';
import Profile, { PinCreated, PinSaved } from '../pages/Profile';
import InfoProfile from '../pages/Settings/InfoProfile';
import AccountSetting from '../pages/Settings/AccountSetting';
import ChangePassword from '../pages/Settings/ChangePassword';
import { Register } from '../pages/Account';
import { Login } from '../pages/Account';
import Dashboard from '../pages/Admin/Dashboard';
import User from '../pages/Admin/User';
import Type from '../pages/Admin/Type';
import Post from '../pages/Admin/Post';
import Comment from '../pages/Admin/Comment';
import Statistic from '../pages/Admin/Statistic';
import Function from '../pages/Admin/Function';
import Permission from '../pages/Admin/Permission';
import ContentReport from '../pages/Admin/ContentReport';

// Layout
import { RegisterLayout } from '../layouts';
import { AdminLayout } from '../layouts';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.register, component: Register, layout: RegisterLayout },
    { path: config.routes.login, component: Login, layout: RegisterLayout },
    { path: config.routes.pin, component: DisplayPin },
];

//Không đăng nhập => chuyển login
const privateRoutes = [
    { path: config.routes.create, component: Create },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.infoProfile, component: InfoProfile },
    { path: config.routes.accountSetting, component: AccountSetting },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.pinCreatedOfUser, component: PinCreated },
    { path: config.routes.pinSavedOfUser, component: PinSaved },
    { path: config.routes.board, component: Board },

    //admin
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout, admin: true },
    { path: config.routes.userAdmin, component: User, layout: AdminLayout, admin: true },
    { path: config.routes.typeAdmin, component: Type, layout: AdminLayout, admin: true },
    { path: config.routes.postAdmin, component: Post, layout: AdminLayout, admin: true },
    { path: config.routes.commentAdmin, component: Comment, layout: AdminLayout, admin: true },
    { path: config.routes.statistic, component: Statistic, layout: AdminLayout, admin: true },
    { path: config.routes.functionAdmin, component: Function, layout: AdminLayout, admin: true },
    { path: config.routes.permissionAdmin, component: Permission, layout: AdminLayout, admin: true },
    { path: config.routes.contentReportAdmin, component: ContentReport, layout: AdminLayout, admin: true },
    {
        path: config.routes.infoProfileAdmin,
        component: (props) => <InfoProfile {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
        admin: true,
    },
    {
        path: config.routes.accountSettingAdmin,
        component: (props) => <AccountSetting {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
        admin: true,
    },
    {
        path: config.routes.changePasswordAdmin,
        component: (props) => <ChangePassword {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
        admin: true,
    },
];

export { publicRoutes, privateRoutes };
