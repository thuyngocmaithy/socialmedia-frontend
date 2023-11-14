<<<<<<< HEAD
import * as httpRequest from '../utils/httpRequest';

export const getAllConversations = async () => {
    try {
        const res = await httpRequest.get(`conversations/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
=======
import * as httpRequest from '../utils/httpRequest';

export const getAllConversations = async () => {
    try {
        const res = await httpRequest.get(`conversations/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
>>>>>>> 314505d7d6575d92a690e7e4eec041b98f0ca63c
