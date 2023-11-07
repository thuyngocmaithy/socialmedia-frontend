import * as httpRequest from '../utils/httpRequest';

export const getAllPins = async () => {
    try {
        const res = await httpRequest.get(`pins/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPinsByUsername = async (username) => {
    try {
        const res = await httpRequest.get(`pins/username/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPinById = async (id) => {
    try {
        const res = await httpRequest.get(`pins/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const save = async (pin) => {
    try {
        const res = await httpRequest.post(`pins/add`, pin, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}