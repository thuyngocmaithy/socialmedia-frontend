import * as httpRequest from '../utils/httpRequest';

export const getAllConversations = async () => {
    try {
        const res = await httpRequest.get(`messages/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMessageByConversationId = async (conversation_id) => {
    try {
        const res = await httpRequest.get(`messages/conversation_id/${conversation_id}`, {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
