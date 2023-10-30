import * as httpRequest from '../utils/httpRequest';

export const getPinsByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`pins/username/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPinById = async (id) => {
    try {
        const res = await httpRequest.get(`pins/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
