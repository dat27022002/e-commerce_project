import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingModal from '~/components/commons/loading-modal/loading-modal';
import ProductInfo from '~/components/product/product-info';
import Review from '~/components/product/review';
import ProductService from '~/services/productService';

const cx = classNames;

function Product() {
    const { productId } = useParams();
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
    }, [productId]);
    console.log(product);
    // const product = {
    //     id: '1',
    //     name: 'Born Pink Heart Global Black T-shirt',
    //     price: '930000',
    //     listedPrice: '3000000',
    //     image: 'https://storageaura.blob.core.windows.net/blobauragroupstorage/azure906_z5309061293638_fc68d16db5b7b18f115186bbc22312e8.jpg',
    // };
    return (
        <div className="flex justify-center w-full">
            {product && (
                <section className="w-full max-w-[1440px] flex flex-col gap-6 items-center py-6 px-10">
                    <ProductInfo product={product} />
                    <Review reviews={product?.Fake_review_product} />
                </section>
            )}

            {isLoading && <LoadingModal />}
        </div>
    );
}

export default Product;
