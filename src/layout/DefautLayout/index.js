import classNames from 'classnames';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames;

function DefautLayout({ children }) {
    return (
        <div className={cx('relative min-h-screen text-base text-text-color')}>
            <Header />
            <div className={cx('flex justify-center mt-header-default')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefautLayout;
