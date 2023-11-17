import config from '../config';

// Pages
import { Login, Register } from '../pages/Account';
import Comment from '../pages/Admin/Comment';
import ContentReport from '../pages/Admin/ContentReport';
import Dashboard from '../pages/Admin/Dashboard';
import Function from '../pages/Admin/Function';
import Permission from '../pages/Admin/Permission';
import Post from '../pages/Admin/Post';
import Statistic from '../pages/Admin/Statistic';
import Type from '../pages/Admin/Type';
import User from '../pages/Admin/User';
import Board from '../pages/Board';
import Create from '../pages/Create';
import Home from '../pages/Home';
import News_Hub from '../pages/News_Hub';
import DisplayPin from '../pages/Pin';
import Profile, { PinCreated, PinSaved } from '../pages/Profile';
import AccountSetting from '../pages/Settings/AccountSetting';
import ChangePassword from '../pages/Settings/ChangePassword';
import InfoProfile from '../pages/Settings/InfoProfile';

// Layout
import { AdminLayout, RegisterLayout } from '../layouts';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.create, component: Create },
    { path: config.routes.register, component: Register, layout: RegisterLayout },
    { path: config.routes.login, component: Login, layout: RegisterLayout },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.infoProfile, component: InfoProfile },
    { path: config.routes.accountSetting, component: AccountSetting },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.pin, component: DisplayPin },
    { path: config.routes.news_hub, component: News_Hub },
];

//Không đăng nhập => chuyển login
const privateRoutes = [
    { path: config.routes.pinCreatedOfUser, component: PinCreated },
    { path: config.routes.pinSavedOfUser, component: PinSaved },
    { path: config.routes.board, component: Board },
    //admin
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.routes.userAdmin, component: User, layout: AdminLayout },
    { path: config.routes.typeAdmin, component: Type, layout: AdminLayout },
    { path: config.routes.postAdmin, component: Post, layout: AdminLayout },
    { path: config.routes.commentAdmin, component: Comment, layout: AdminLayout },
    { path: config.routes.statistic, component: Statistic, layout: AdminLayout },
    { path: config.routes.functionAdmin, component: Function, layout: AdminLayout },
    { path: config.routes.permissionAdmin, component: Permission, layout: AdminLayout },
    { path: config.routes.contentReportAdmin, component: ContentReport, layout: AdminLayout },
    {
        path: config.routes.infoProfileAdmin,
        component: (props) => <InfoProfile {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
    },
    {
        path: config.routes.accountSettingAdmin,
        component: (props) => <AccountSetting {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
    },
    {
        path: config.routes.changePasswordAdmin,
        component: (props) => <ChangePassword {...props} admin={true} />,
        layout: (props) => <AdminLayout {...props} account={true} />,
    },
];

export { privateRoutes, publicRoutes };
