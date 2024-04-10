import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <img
            src="/logo.svg"
            alt=""
            className="h-[60px] object-cover hover:cursor-pointer z-50"
            onClick={() => navigate('/')}
        />
    );
};

export default Logo;
