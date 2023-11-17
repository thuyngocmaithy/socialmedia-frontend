import * as httpRequest from '../utils/httpRequest';

export const getCountFriend = async (id) => {
    try {
        const res = await httpRequest.get(`/friendships/count/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getListFriend = async (id) => {
    try {
        const res = await httpRequest.get(`/friendships/listFriend/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getListRequest = async (id) => {
    try {
        const res = await httpRequest.get(`/friendships/listRequest/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFriendByNotification = async (notificationId) => {
    try {
        const res = httpRequest.get(`friendships/getByNotification/${notificationId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (id, friendship) => {
    try {
        const res = await httpRequest.put(`/friendships/edit/${id}`, friendship, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteById = async (id) => {
    try {
        const res = await httpRequest.post(`/friendships/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
