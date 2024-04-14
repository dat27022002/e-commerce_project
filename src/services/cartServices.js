import httpRequest from '~/utils/httpRequest';
import config from '~/config';

export default class CartService {
    static getFromCart = async () => {
        try {
            const res = await httpRequest.get(config.api.CART);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static addToCart = async ({ variant_id, quantity }) => {
        try {
            const res = await httpRequest.post(config.api.CART, { variant_id, quantity });
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static removeFromCart = async ({ variant_id }) => {
        try {
            const res = await httpRequest.delete(`${config.api.CART}?variant_id=${variant_id}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}
