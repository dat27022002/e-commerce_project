import ProductCard from './product/product-card';
import { useEffect } from 'react';
import ProductService from '~/services/productService';
import productStore from '~/stores/product-store';

const ProductSection = () => {
    const { products, setProducts } = productStore();
    useEffect(() => {
        const fetchProducts = async () => {
            const _products = await ProductService.getAllProducts();
            setProducts(_products);
        };
        if (products?.length == 0) fetchProducts();
    }, []);

    return (
        <section className="flex w-full flex-col items-center gap-8 max-w-[1440px] px-10 pb-10">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-semibold">Browse The Range</h1>
                <span className="text-base">Find the best style for you</span>
            </div>
            <div className="w-full grid grid-cols-4 gap-6 ">
                {products.slice(0, 8).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
