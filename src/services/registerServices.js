import * as httpRequest from '../utils/httpRequest';

export const save = async (fullname, username, birthday, password) => {
    try {
        const userlog = {
            username: username,
            fullname: fullname,
            birthday: birthday,
            password: password,
            introduce: null,
            avatar: null,
            website: null,
            gender: null,
            language: null,
            privateBool: false,
            created_at: null,
        };
        console.log(userlog);
        const res = await httpRequest.post(`users/register`, userlog, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
