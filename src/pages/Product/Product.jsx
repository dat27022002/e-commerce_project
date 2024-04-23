import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingModal from '~/components/commons/loading-modal/loading-modal';
import ProductCard from '~/components/home/product/product-card';
import ProductInfo from '~/components/product/product-info';
import Review from '~/components/product/review';
import ProductService from '~/services/productService';
import productStore from '~/stores/product-store';

function Product() {
    const { productId } = useParams();
    const { products, setProducts } = productStore();
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    setIsLoading(true);
                    const _product = await ProductService.getProductById(productId);
                    if (_product) {
                        setProduct(_product);
                    } else {
                        navigate('/', { replace: true });
                    }
                } catch (error) {
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProduct();
        } else {
            navigate('/', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);
    console.log(product);
    useEffect(() => {
        const fetchProducts = async () => {
            const _products = await ProductService.getAllProducts();
            setProducts(_products);
        };
        if (products?.length === 0) fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="flex justify-center w-full">
            {product && (
                <section className="w-full max-w-[1440px] flex flex-col gap-6 items-center py-6 px-10">
                    <ProductInfo product={product} />
                    <Review reviews={product?.Fake_review_product} />
                    {products && products?.length > 0 && (
                        <div className="flex w-full justify-center gap-6 mt-6 flex-col items-center">
                            <h1 className="text-2xl font-semibold">You may aslo like</h1>
                            <div className="w-full grid grid-cols-4 gap-6 ">
                                {products
                                    ?.filter((e) => e?.id !== product?.id)
                                    .slice(0, 8)
                                    .map((product, idx) => (
                                        <ProductCard product={product} key={'product-' + idx} />
                                    ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {isLoading && <LoadingModal />}
        </div>
    );
}

export default Product;
