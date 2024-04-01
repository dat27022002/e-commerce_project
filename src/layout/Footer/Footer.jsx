import classNames from 'classnames';

import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames;

function Footer() {
    const inforFooter = [
        { title: 'about website', item: ['introduce', 'rules', 'security'] },
        { title: 'support', item: ['user manual', 'customer area', 'respond to complain', 'contact'] },
        { title: 'social media', item: ['Facebook', 'Youtube', 'Tiktok', 'Instagram'] },
    ];
    return (
        <div className={cx('shadow-[0px_-6px_3px_rgba(0,0,0,0.12)]', 'mt-auto flex justify-between flex-wrap py-6')}>
            {inforFooter.map((item, indexItem) => {
                return (
                    <div
                        className={cx('w-[33%] flex flex-col text-center font-[0.9375rem] leading-[1.625rem]')}
                        key={indexItem}
                    >
                        <span className={cx('font-semibold')}>{item.title}</span>
                        <ul className={cx('text-[#677788]')}>
                            {item.item.map((itemList, indexItemList) => {
                                return (
                                    <li className={cx('hover:text-text-color-link')} key={indexItemList}>
                                        <Link>{itemList}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
            <Link to={config.routes.HOME} className={cx('w-full flex justify-center mt-5')}></Link>
        </div>
    );
}

export default Footer;
