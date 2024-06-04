import { data } from 'autoprefixer';
import httpRequest, { get, post } from '~/utils/httpRequest';

const productRoutes = {
    getAllProducts: '/fake-review/products',
    getAllCategories: '/category',
    product: '/product/filter',
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
            const res = await httpRequest.post(productRoutes.product, { data: { category_id: category } });
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
            const res = await get(productRoutes.getAllCategories);
            return res;
        } catch (error) {}
        return [];
    };
    static searchProduct = async (valueSearch) => {
        try {
            const res = await post(productRoutes.product, { data: { search: valueSearch } });
            return res;
        } catch (error) {}
        return [];
    };
}
