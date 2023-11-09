import * as httpRequest from '../utils/httpRequest';

export const getPinByUserIdAndBoardId = async (userId, boardId) => {
    try {
        const res = await httpRequest.get(`userSavePin/getPin/${userId}/${boardId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const save = async (userSavePin) => {
    try {
        const res = await httpRequest.post(`userSavePin/add`, userSavePin, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const del = async (userSavePin) => {
    try {
        const res = await httpRequest.post(`userSavePin/delete`, userSavePin, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
