import { useNavigate } from 'react-router-dom';

const Footer = () => {
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
        <footer className="w-full py-8 px-[80px] border-t-2 border-solid border-slate-200 shadow-sm shadow-slate-200 flex items-start justify-between">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Just be you.</h1>
                <p className="text-slate-500 text-base">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
            </div>
            <div className="flex flex-col gap-10">
                <span className="text-base text-slate-500">Links</span>
                {items.map((item, idx) => (
                    <span
                        key={'item-' + idx}
                        onClick={() => navigate(item.path)}
                        className="text-base font-medium hover:cursor-pointer hover:border-b hover:border-black hover:border-solid transition-all duration-200"
                    >
                        {item.label}
                    </span>
                ))}
            </div>
            <div className="flex flex-col gap-10">
                <span className="text-base text-slate-500">Help</span>
                <span className="text-base font-medium hover:cursor-pointer hover:border-b hover:border-black hover:border-solid transition-all duration-200">
                    Payment Options
                </span>
                <span className="text-base font-medium hover:cursor-pointer hover:border-b hover:border-black hover:border-solid transition-all duration-200">
                    Returns
                </span>
                <span className="text-base font-medium hover:cursor-pointer hover:border-b hover:border-black hover:border-solid transition-all duration-200">
                    Privacy Policies
                </span>
            </div>
            <div className="flex flex-col gap-10">
                <span className="text-base text-slate-500">Newsletter</span>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        className="outline-none focus:outline-none border-b border-solid border-black border-x-0 border-t-0"
                        placeholder="Enter Your Email Address"
                    />
                    <span className="text-base font-medium hover:cursor-pointer hover:border-b hover:border-black hover:border-solid transition-all duration-200">
                        Returns
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
