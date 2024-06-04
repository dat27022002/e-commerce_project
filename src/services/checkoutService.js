import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export default class CheckoutService {
    static createOrderForCart = async ({ cart, recipient }) => {
        const checkoutData = {
            amount: cart.reduce((total, item) => total + item.price_sale * item.quantity, 0),
            recipient_information_id: recipient.id,
            shipping_method_id: 1,
            payment_method_id: 2,
            variant_order: cart.map((item) => ({
                price: item.price_sale,
                quantity: item.quantity,
                variant_id: item.id,
            })),
        };
        try {
            const res = await httpRequest.post(config.api.CHECKOUT, checkoutData);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
    static createOrderForProduct = async ({ variant, recipient }) => {
        const checkoutData = {
            amount: variant.price_sale * variant.quantity,
            recipient_information_id: recipient.id,
            shipping_method_id: 1,
            payment_method_id: 2,
            variant_order: [
                {
                    price: variant.price_sale,
                    quantity: variant.quantity,
                    variant_id: variant.id,
                },
            ],
        };
        try {
            const res = await httpRequest.post(config.api.CHECKOUT, checkoutData);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}
