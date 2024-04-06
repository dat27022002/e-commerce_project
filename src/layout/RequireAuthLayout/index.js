import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import Header from '../Header';
import Footer from '../Footer';
import classNames from 'classnames';

const cx = classNames;
function RequireAuth({ children }) {
    const { user } = useAuth();

    return user ? (
        <div className={cx('relative min-h-screen text-base text-text-color flex flex-col')}>
            <Header />
            <div className={cx('flex justify-center mt-header-default flex-1')}>{children}</div>
            <Footer />
        </div>
    ) : (
        <Navigate to="/" replace />
    );
}
export default RequireAuth;
