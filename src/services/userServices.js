import * as httpRequest from '../utils/httpRequest';

export const getUserByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`users/username/${username}`);
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
