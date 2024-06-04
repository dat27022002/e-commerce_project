import Slider from '~/components/home/hero-banner';
import ProductSection from '~/components/home/product-section';

function Home() {
    return (
        <div className="w-full flex flex-col gap-6 items-center">
            <Slider />
            <ProductSection />
        </div>
    );
}

export default Home;
