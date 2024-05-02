import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';

import Image from '~/components/Image';
import LoadingModal from '~/components/commons/loading-modal/loading-modal';
import Menu from '../Menu';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import config from '~/config';
import { userMenu, noUserMenu } from '../Constant';
import { useAuth } from '~/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import LoginPopup from '~/components/login/LoginPopup';

const cx = classNames.bind(styles);

function Action() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [openLogin, setOpenLogin] = useState(false);
    const token = localStorage.getItem('token');
    const auth = useAuth();
    const currentUser = auth.user;

    // Handle logic

    const handleLogout = async () => {
        setLoading(true);
        await auth.logout();
        navigate(config.routes.LOGIN);
        setLoading(false);
    };

    const handleMenuChange = async (menuItem) => {
        switch (menuItem.title) {
            case 'Log out':
                handleLogout();
                break;
            default:
        }
    };
    const handleLogin = () => {
        auth.savedRoute.current = location.pathname;
        if (location.pathname === '/') {
            navigate(config.routes.LOGIN);
        } else {
            setOpenLogin(true);
        }
    };
    const handleSignup = () => {
        auth.savedRoute.current = location.pathname;
        navigate(config.routes.SIGNUP);
    };
    return (
        <Fragment>
            <div className={cx('flex items-center justify-end ml-6')}>
                {token ? (
                    <Link to={config.routes.CART} className={cx('mr-2 h-9 px-2 flex justify-center items-center')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                ) : (
                    <Fragment>
                        <Button className={cx('mr-2 h-9 px-2')} primary onClick={handleLogin}>
                            Login
                        </Button>
                        <Button className={cx('h-9  px-2', 'max-sm:hidden')} primary onClick={handleSignup}>
                            Sign up
                        </Button>
                    </Fragment>
                )}
                <Menu items={token ? userMenu : noUserMenu} onChange={handleMenuChange}>
                    {token ? (
                        <Image
                            className={cx('ml-[14px] h-8 w-8 cursor-pointer rounded-full object-cover')}
                            src={currentUser?.avatar || ''}
                            fallback={NoimageAvatar}
                        />
                    ) : (
                        <button className={cx('ml-3 cursor-pointer bg-transparent px-1 py-2 text-xl')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
            {openLogin && (
                <LoginPopup
                    open={openLogin}
                    onClose={() => setOpenLogin(false)}
                    onSubmit={async (data) => {
                        setLoading(true);
                        await auth.login(data, () => {
                            setLoading(false);
                            setOpenLogin(false);
                        });
                    }}
                />
            )}
            {loading && <LoadingModal />}
        </Fragment>
    );
}

export default Action;
