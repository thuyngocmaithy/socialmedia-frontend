const routes = {
    home: '/',
    create: '/create',
    profile: '/:username',
    pinCreatedOfUser: '/:username/_created',
    pinSavedOfUser: '/:username/_saved',
    board: '/:username/board/:boardname',
    infoProfile: '/:username/edit-profile',
    accountSetting: '/:username/account-setting',
    changePassword: '/:username/password',
    register: '/register',
    login: '/login',
};

export default routes;
