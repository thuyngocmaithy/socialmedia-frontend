import * as httpRequest from '../utils/httpRequest';

export const getAllConversations = async () => {
    try {
        const res = await httpRequest.get(`conversations/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
