import * as httpRequest from '../utils/httpRequest';

export const getUser = async (username) => {
    try {
        const res = await httpRequest.get(`users/${username}`);
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
