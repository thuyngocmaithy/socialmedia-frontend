import * as httpRequest from '../utils/httpRequest';

// export const getTypeByUsername = async (username) => {
//     try {
//         const res = await httpRequest.get(`types/username/${username}`);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getAllTypes = async () => {
    try {
        const res = await httpRequest.get(`types/getAll`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getTypeById = async (id) => {
    try {
        const res = await httpRequest.get(`types/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const save = async (type) => {
    try {
        const res = await httpRequest.post(`types/add`, type, {
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
