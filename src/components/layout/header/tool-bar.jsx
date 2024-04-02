import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const ToolBar = () => {
    return (
        <section className="flex items-center gap-6 md:gap-10">
            <SearchOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <FavoriteBorderOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <ShoppingCartOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <Button variant="text" className="!text-slate-600 !border-slate-600 !normal-case flex items-center gap-2">
                Sign in <LoginOutlinedIcon />
            </Button>
        </section>
    );
};

export default ToolBar;
