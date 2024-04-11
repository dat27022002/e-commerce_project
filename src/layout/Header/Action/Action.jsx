import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';
import Menu from '../Menu';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
//import { logout } from '~/services/authServices';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
// eslint-disable-next-line no-unused-vars
import notify from '~/utils/notify';
import config from '~/config';
import { userMenu } from '../Constant';
const cx = classNames.bind(styles);

function Action() {
    const [currentUser, setCurrentUser] = useState(false);
    const [inforUser, setInforUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    // Handle logic

    // const handleLogout = () => {
    //     const token = cookies.token;
    //     setLoading(true);
    //     logout(token)
    //         .then(() => {
    //             setLoading(false);
    //             localStorage.clear();
    //             removeCookie('token');
    //             navigate(config.routes.auth.LOGIN);
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             if (!error.response) {
    //                 notify.error(config.errorMesseage.getMesseageNotify().ERROR_NETWORD);
    //                 return;
    //             }

    //             notify.error(error.response.data.message);
    //         });
    // };

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            default:
        }

        //item in the outermost layer
        switch (menuItem.title) {
            case 'log out':
                //handleLogout();
                break;
            default:
        }
    };

    // useEffect(() => {
    //     const token = cookies.token;
    //     if (token) {
    //         setCurrentUser(true);
    //         setInforUser({
    //             name: localStorage.getItem('name'),
    //             username: localStorage.getItem('name'),
    //             email: localStorage.getItem('email'),
    //             avatar: localStorage.getItem('avatar'),
    //         });
    //     }
    // }, [cookies.token]);

    return (
        <Fragment>
            <div className={cx('flex items-center justify-end ml-6')}>
                {currentUser ? (
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
                <Menu items={userMenu} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            className={cx('ml-[14px] h-8 w-8 cursor-pointer rounded-full object-cover')}
                            src={inforUser.avatar}
                            alt={inforUser.name}
                            fallback={NoimageAvatar}
                        />
                    ) : (
                        <button className={cx('ml-3 cursor-pointer bg-transparent px-1 py-2 text-xl')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Action;
