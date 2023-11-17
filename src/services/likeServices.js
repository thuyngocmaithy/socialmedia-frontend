import * as httpRequest from '../utils/httpRequest';

export const countAll = async () => {
    try {
        const res = await httpRequest.get(`likes/countAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getLikeByNotification = async (notificationId) => {
    try {
        const res = httpRequest.get(`likes/getByNotification/${notificationId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const percent7days = async () => {
    try {
        const res = await httpRequest.get(`likes/percent7days`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
