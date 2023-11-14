import * as httpRequest from '../utils/httpRequest';

export const getAllConversations = async () => {
    try {
        const res = await httpRequest.get(`conversations/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getParticipantByConversationId = async (conversation_id) => {
    try {
        const res = await httpRequest.get(`participants/conversation_id/${conversation_id}`, {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getConversationJoinedByUserId = async (user_id) => {
    try {
        const res = await httpRequest.get(`participants/getConversationJoined/${user_id}`, {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFriendChattingWith = async (user_id) => {
    try {
        const res = await httpRequest.get(`participants/getChattingWith/${user_id}`, {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
