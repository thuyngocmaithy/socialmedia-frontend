import * as httpRequest from '../utils/httpRequest';

export const getUserByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`users/username/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByPassword = async (password) => {
    try {
        const res = await httpRequest.get(`users/password/${password}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const login = async (username, password) => {
    try {
        const userlog = {
            username: username,
            password: password,
        };

        const res = await httpRequest.post(`users/login`, userlog, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
