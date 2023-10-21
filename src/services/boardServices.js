import * as httpRequest from '../utils/httpRequest';

export const getBoardByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`boards/username/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getBoardById = async (id) => {
    try {
        const res = await httpRequest.get(`boards/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
