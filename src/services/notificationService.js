import * as httpRequest from '../utils/httpRequest';

export const getAllNotifications = async (userId) => {
    try {
        const res = await httpRequest.get(`notifications/user/${userId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const initNotifications = async (data, userId) => {
    try {
        const res = await httpRequest.post(`notifications/init/${userId}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getNewsHub = async (notificationId) => {
    try {
        const res = await httpRequest.get(`/news_hub/${notificationId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleted = async (userId) => {
    try {
        const res = await httpRequest.post(`notifications/delete/${userId}`);
    } catch (error) {
        console.log(error);
    }
};
