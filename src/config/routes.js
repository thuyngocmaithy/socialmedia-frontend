const routes = {
    home: '/',
    create: '/create',
    profile: '/:username',
    pinCreatedOfUser: '/:username/_created',
    pinSavedOfUser: '/:username/_saved',
    board: '/:username/:boardname',
    infoProfile: '/:username/settings/edit-profile',
    accountSetting: '/:username/settings/account-setting',
    changePassword: '/:username/settings/password',
};

export default routes;
