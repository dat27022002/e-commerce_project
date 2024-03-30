import classNames from 'classnames';

const cx = classNames;

function Home() {
    return (
        <div className={cx('bg-blue-100 text-8xl font-semibold w-screen h-[600px] flex items-center justify-center')}>
            HOME
        </div>
    );
}

export default Home;
