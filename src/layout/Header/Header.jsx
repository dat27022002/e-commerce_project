import classNames from 'classnames';

const cx = classNames;

function Header() {
    return (
        <div
            className={cx(
                'fixed left-0 top-0 z-10 flex w-full justify-center',
                'h-header-default shadow-[0_3px_3px_rgba(0,0,0,0.12)] bg-red-100',
            )}
        >
            Header
        </div>
    );
}

export default Header;
