import * as httpRequest from '../utils/httpRequest';

export const getAllUser = async () => {
    try {
        const res = await httpRequest.get(`users/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`users/username/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`users/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const add = async (user) => {
    try {
        const res = await httpRequest.post(`users/add`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteById = async (id) => {
    try {
        const res = await httpRequest.post(`users/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const countAll = async () => {
    try {
        const res = await httpRequest.get(`users/countAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const percent7days = async () => {
    try {
        const res = await httpRequest.get(`users/percent7days`);
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

export const save = async (user) => {
    try {
        console.log(user);
        const res = await httpRequest.post(`users/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
