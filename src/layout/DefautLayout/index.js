import classNames from 'classnames';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames;

function DefautLayout({ children }) {
    return (
        <div className={cx('relative min-h-screen text-base text-text-color flex flex-col')}>
            <Header />
            <div className={cx('flex justify-center mt-header-default flex-1')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefautLayout;
