import * as httpRequest from '../utils/httpRequest';

export const getAllPin = async (username) => {
    try {
        const res = await httpRequest.get(`pins/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};


