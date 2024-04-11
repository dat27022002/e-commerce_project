import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';

import Image from '~/components/Image';
import LoadingModal from '~/components/commons/loading-modal/loading-modal';
import Menu from '../Menu';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import config from '~/config';
import { userMenu, noUserMenu } from '../Constant';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function Action() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    return (
        <Fragment>
            <div className={cx('flex items-center justify-end ml-6')}>
                {token ? (
                    <></>
                ) : (
                    <Fragment>
                        <Button className={cx('mr-2 h-9 px-2')} primary to={config.routes.LOGIN}>
                            Login
                        </Button>
                        <Button className={cx('h-9  px-2', 'max-sm:hidden')} primary to={config.routes.SIGNUP}>
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
            {loading && <LoadingModal />}
        </Fragment>
    );
}

export default Action;
