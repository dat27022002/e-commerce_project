import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Search from './Search';
import Action from './Action';

import config from '~/config';

const cx = classNames.bind(styles);

const navigation = [
    { title: 'WOMEN', link: '' },
    { title: 'MEN', link: '' },
    { title: 'LUXURY', link: '' },
    { title: 'SPORTS', link: '' },
    { title: 'KIDS', link: '' },
    { title: 'BEAUTY', link: '' },
    { title: 'HOME & LIFESTYLE', link: '' },
];

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showBoxSearch, setShowBoxSearch] = useState(true);
    const [indexNavigation, setIndexNavigation] = useState(-1);

    const location = useLocation();

    // eslint-disable-next-line no-unused-vars
    const currentPath = location.pathname;

    const handleClickBtnMenu = () => {
        if (showMenu === false) {
            setShowMenu(true);
            return;
        }
        setShowMenu(false);
    };

    const openSearch = () => {
        setShowBoxSearch(true);
    };

    const closeSearch = () => {
        setShowBoxSearch(false);
    };

    const handleNavigation = (index) => {
        setIndexNavigation(index);
    };

    return (
        <div
            className={cx(
                'fixed left-0 top-0 z-10 flex w-full justify-center',
                'h-header-default shadow-[0_3px_3px_rgba(0,0,0,0.12)] bg-background-color',
            )}
        >
            <div className={cx('flex h-full w-full items-center justify-between px-7', 'max-lg:relative')}>
                <button className={cx('invisible', 'max-lg:visible max-lg:pr-4')} onClick={handleClickBtnMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* logo */}
                <Link
                    to={config.routes.HOME}
                    className={cx('flex items-center justify-center h-full text-2xl font-mono tracking-[0.3rem] mr-5')}
                >
                    <div>SUPERHERO</div>
                </Link>

                <ul
                    className={cx(
                        'flex h-full flex-1 items-center justify-start',
                        'max-lg:invisible max-lg:absolute max-lg:left-0 max-lg:flex max-lg:h-auto max-lg:w-full ',
                        'max-lg:translate-x-[-100%] max-lg:flex-col max-lg:overflow-hidden',
                        'navigation',
                        {
                            'max-lg:!visible max-lg:!translate-x-0': showMenu,
                            'navigation-active': showMenu,
                        },
                    )}
                >
                    {navigation.map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={cx(
                                    'flex h-full cursor-pointer items-center px-2 py-0 text-[0.90625rem] font-semibold',
                                    'max-lg:w-full max-lg:!py-3 max-lg:!text-[0.9375rem]',
                                    indexNavigation === index &&
                                        'border-b-[2px] border-b-solid border-b-text-color-link !text-text-color-link mb-[-2px]',

                                    'hover:border-b-[2px] hover:border-b-solid hover:mb-[-2px]',
                                    'hover:border-b-text-color-link hover:text-text-color-link',
                                )}
                                onClick={() => handleNavigation(index)}
                            >
                                <Link to={value.link} onClick={handleClickBtnMenu}>
                                    {value.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Search showBoxSearch={showBoxSearch} />

                <button className={cx('mr-2 w-8 h-8 rounded-full hidden bg-background-button', 'max-md:!block')}>
                    {showBoxSearch ? (
                        <FontAwesomeIcon icon={faXmark} onClick={closeSearch} />
                    ) : (
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={openSearch} />
                    )}
                </button>

                <Action />
            </div>
        </div>
    );
}

export default Header;
