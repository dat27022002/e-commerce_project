import httpRequest from '~/utils/httpRequest';

export default class CartService {
    static getFromCart = async () => {
        const token = JSON.parse(window.localStorage.getItem('token'));
        if (!token) throw new Error('No token found');
        try {
            const res = await httpRequest.get('user/cart', { headers: { Authorization: `Bearer ${token}` } });
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static addToCart = async ({ variant_id, quantity }) => {
        const token = JSON.parse(window.localStorage.getItem('token'));
        if (!token) throw new Error('No token found');
        try {
            const res = await httpRequest.post(
                'user/cart',
                { variant_id, quantity },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    static removeFromCart = async ({ variant_id }) => {
        const token = JSON.parse(window.localStorage.getItem('token'));
        if (!token) throw new Error('No token found');
        try {
            const res = await httpRequest.delete(`/user/cart/?variant_id=${variant_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}
