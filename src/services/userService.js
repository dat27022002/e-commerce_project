import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export default class UserService {
    static getRecipientUser = async () => {
        try {
            const res = await httpRequest.get(config.api.RECIPIENT);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static addRecipient = async ({ name, phone_number, address }) => {
        try {
            const res = await httpRequest.post(config.api.RECIPIENT, { name, phone_number, address });
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static updateRecipient = async ({ id_recipient, name, phone_number, address, default_recipient }) => {
        try {
            const res = await httpRequest.patch(config.api.RECIPIENT, {
                id_recipient,
                name,
                phone_number,
                address,
                default_recipient,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}
