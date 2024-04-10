import classNames from 'classnames';
import Slider from '~/components/home/hero-banner';
import ProductSection from '~/components/home/product-section';

const cx = classNames;

function Home() {
    return (
        <div className="w-full flex flex-col gap-6 items-center">
            <Slider />
            <ProductSection />
        </div>
    );
}

export default Home;
