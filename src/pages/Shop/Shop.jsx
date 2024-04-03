import classNames from 'classnames';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Slider from '~/components/home/hero-banner';
import ProductCard from '~/components/home/product/product-card';
import ProductService from '~/services/productService';
import productStore from '~/stores/product-store';

const cx = classNames;

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, setProducts } = productStore();
    useEffect(() => {
        const fetchProducts = async () => {
            const _products = await ProductService.getAllProducts();
            setProducts(_products);
        };
        if (products?.length == 0) fetchProducts();
    }, []);

    return (
        <div className="flex justify-center w-full">
            <section className="w-full max-w-[1440px] flex flex-col gap-6 items-center py-6 px-10">
                <Slider />
                <div className="w-[200px] sm:w-[400px] md:w-[600px] lg:w-[800px] px-6 py-3 rounded-lg shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] flex items-center gap-6">
                    <input
                        placeholder="Search here"
                        defaultValue={searchParams?.get('search')}
                        onChange={(event) => {
                            const { name, value } = event?.target;
                            if (value) {
                                setSearchParams({ search: value });
                            } else {
                                setSearchParams({});
                            }
                        }}
                        className="flex-1 border border-solid border-slate-200 rounded-lg px-4 py-2 text-sm"
                    />
                    <button className="px-6 py-2 rounded-lg text-white bg-[#434343]">Search</button>
                </div>
                <div className="w-full grid grid-cols-4 gap-6 ">
                    {products
                        .filter((e) =>
                            searchParams?.get('search')?.toLowerCase()
                                ? e?.name?.toLowerCase()?.includes(searchParams?.get('search')?.toLowerCase())
                                : true,
                        )
                        .map((product, idx) => (
                            <ProductCard product={product} key={'product-' + idx} />
                        ))}
                </div>
            </section>
        </div>
    );
}

export default Shop;
