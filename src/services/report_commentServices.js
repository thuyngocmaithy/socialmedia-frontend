import * as httpRequest from '../utils/httpRequest';

export const count = async () => {
    try {
        const res = await httpRequest.get(`report_comments/count`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
