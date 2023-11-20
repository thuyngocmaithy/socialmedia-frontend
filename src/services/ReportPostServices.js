import * as httpRequest from '../utils/httpRequest';

export const getPin = async () => {
    try {
        const res = await httpRequest.get(`report_pins/get`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getPinId = async (id) => {
    try {
        const res = await httpRequest.get(`report_pins/id/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const changeApprove = async (id, approveState) => {
    try {
        const res = await httpRequest.put(`report_pins/id/${id}/${approveState}`);
        return res.status;
    } catch (error) {
        console.log(error);
        throw error;
    }
};