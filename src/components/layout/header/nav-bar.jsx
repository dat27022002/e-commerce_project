import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const items = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Shop',
            path: '/shop',
        },
        {
            label: 'About',
            path: '/about',
        },
        {
            label: 'Contact',
            path: '/contact',
        },
    ];
    const navigate = useNavigate();
    return (
        <section className="flex items-center gap-10 md:gap-16">
            {items.map((item, idx) => (
                <span
                    className="text-base font-medium transition-all duration-200 hover:border-b hover:border-solid hover:border-slate-600 hover:cursor-pointer"
                    key={'nav-' + idx}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </span>
            ))}
        </section>
    );
};

export default Navbar;
