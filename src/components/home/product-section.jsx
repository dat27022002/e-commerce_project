import ProductCard from './product/product-card';

const ProductSection = () => {
    const products = [
        {
            id: '1',
            name: 'Born Pink Heart Global Black T-shirt',
            price: '930000',
            listedPrice: '3000000',
            image: 'https://storageaura.blob.core.windows.net/blobauragroupstorage/azure906_z5309061293638_fc68d16db5b7b18f115186bbc22312e8.jpg',
        },
    ];
    return (
        <section className="flex w-full flex-col items-center gap-8 max-w-[1440px] px-10 pb-10">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-semibold">Browse The Range</h1>
                <span className="text-base">Find the best style for you</span>
            </div>
            <div className="w-full grid grid-cols-4 gap-6 ">
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard product={product} key={'product-' + idx} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
