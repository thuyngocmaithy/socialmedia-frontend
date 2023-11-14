import * as httpRequest from '../utils/httpRequest';

export const getByPinId = async (pin_id) => {
    try {
        const res = await httpRequest.get(`comments/pin_id/${pin_id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};