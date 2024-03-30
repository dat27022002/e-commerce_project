import classNames from 'classnames';

const cx = classNames;

function Product() {
    return (
        <div className={cx('bg-blue-100 text-8xl font-semibold w-screen h-[600px] flex items-center justify-center')}>
            PRODUCT
        </div>
    );
}

export default Product;
