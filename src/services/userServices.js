import * as httpRequest from '../utils/httpRequest';

export const getUserByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`users/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`users/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCountFriend = async (id) => {
    try {
        const res = await httpRequest.get(`/friendships/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const changeUserInfo = async (id, userData) => {
    try {
        const res = await httpRequest.put(`users/id/${id}`, userData);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const changeUserBirthdate = async (id, updateBirthday) => {
    try {
        const res = await httpRequest.put(`users/id/${id}/birthdate`, updateBirthday);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const changeUserPassword = async (id, currentPassword, newPassword) => {
    try {

        const res = await httpRequest.put(`users/id/${id}/password`, { currentPassword, newPassword });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const changePrivate = async (id, currentState) => {
    try {
        const res = await httpRequest.put(`users/id/${id}/privateBool`, { currentState });
        return res.status;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const ChangeUserAvatar = async (id, base64String) => {

    try {
        const res = await httpRequest.put(`users/id/${id}/avatar`, { base64String });
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
