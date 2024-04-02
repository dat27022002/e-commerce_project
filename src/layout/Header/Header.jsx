import classNames from 'classnames';
import Logo from '~/components/commons/logo/logo';
import Navbar from '~/components/layout/header/nav-bar';
import ToolBar from '~/components/layout/header/tool-bar';

const cx = classNames;

function Header() {
    return (
        <div
            className={cx(
                'fixed left-0 top-0 z-10 flex w-full items-center justify-between px-10 md:px-15',
                'h-header-default shadow-[0_3px_3px_rgba(0,0,0,0.12)] bg-white',
            )}
        >
            <Logo />
            <Navbar />
            <ToolBar />
        </div>
    );
}

export default Header;
