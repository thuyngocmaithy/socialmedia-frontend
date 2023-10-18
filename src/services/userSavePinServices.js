import * as httpRequest from '../utils/httpRequest';

export const getPinByUserIdAndBoardId = async (userId, boardId) => {
    try {
        const res = await httpRequest.get(`userSavePin/getPin/${userId}/${boardId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
