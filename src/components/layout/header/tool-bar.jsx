import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useAuth } from '~/hooks/useAuth';
const ToolBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    return (
        <section className="flex items-center gap-6 md:gap-10">
            <SearchOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <FavoriteBorderOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <ShoppingCartOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            {user ? (
                <Button
                    variant="text"
                    className="!text-slate-600 !border-slate-600 !normal-case flex items-center gap-2"
                    onClick={() => logout(() => navigate('/'))}
                >
                    Logout <LogoutOutlinedIcon />
                </Button>
            ) : (
                <Button
                    variant="text"
                    className="!text-slate-600 !border-slate-600 !normal-case flex items-center gap-2"
                    onClick={() => navigate(routes.LOGIN)}
                >
                    Sign in <LoginOutlinedIcon />
                </Button>
            )}
        </section>
    );
};

export default ToolBar;
