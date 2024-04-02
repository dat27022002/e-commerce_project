import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import ProductInfo from '~/components/product/product-info';
import Review from '~/components/product/review';

const cx = classNames;

function Product() {
    const { productId } = useParams();
    const product = {
        id: '1',
        name: 'Born Pink Heart Global Black T-shirt',
        price: '930000',
        listedPrice: '3000000',
        image: 'https://storageaura.blob.core.windows.net/blobauragroupstorage/azure906_z5309061293638_fc68d16db5b7b18f115186bbc22312e8.jpg',
    };
    return (
        <div className="flex justify-center w-full">
            <section className="w-full max-w-[1440px] flex flex-col gap-6 items-center py-6 px-10">
                <ProductInfo product={product} />
                <Review />
            </section>
        </div>
    );
}

export default Product;
