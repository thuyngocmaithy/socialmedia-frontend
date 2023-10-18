import * as httpRequest from '../utils/httpRequest';

export const getAllBoard = async (username) => {
    try {
        const res = await httpRequest.get(`boards/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
