import * as httpRequest from '../utils/httpRequest';

export const countAll = async () => {
    try {
        const res = await httpRequest.get(`comments/countAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCommentByNotification = async (notificationId) => {
    try {
        const res = httpRequest.get(`comments/getByNotification/${notificationId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const percent7days = async () => {
    try {
        const res = await httpRequest.get(`comments/percent7days`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
