import httpRequest, { get } from '~/utils/httpRequest';

const productRoutes = {
    getAllProducts: '/fake-review/products',
    getAllCategories: '/category',
    product: '/product',
};

export default class ProductService {
    static getAllProducts = async () => {
        try {
            const res = await httpRequest.get(productRoutes.getAllProducts);
            return res.data;
        } catch (error) {}
        return [];
    };
    static getProductByCategory = async (category) => {
        try {
            const res = await httpRequest.get(productRoutes.product + `?category_id=${category}`);
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
    static getAllCategories = async () => {
        try {
            const res = await get(productRoutes.getAllCategories + '/root');
            return res;
        } catch (error) {}
        return [];
    };
    static searchProduct = async (valueSearch) => {
        try {
            const res = await get(productRoutes.product, { param: { search: valueSearch } });
            return res;
        } catch (error) {}
        return [];
    };
}
