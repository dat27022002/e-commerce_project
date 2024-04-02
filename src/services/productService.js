import httpRequest from '~/utils/httpRequest';

const productRoutes = {
    getAllProducts: '/fake-review/products',
};

export default class ProductService {
    static getAllProducts = async () => {
        try {
            const res = await httpRequest.get(productRoutes.getAllProducts);
            return res.data;
        } catch (error) {}
        return [];
    };
    static getProductById = async (productId) => {
        try {
            const res = await httpRequest.get(productRoutes.getAllProducts + '/' + productId);
            return res.data;
        } catch (error) {}
        return [];
    };
}
