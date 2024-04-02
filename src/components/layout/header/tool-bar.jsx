import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const ToolBar = () => {
    return (
        <section className="flex items-center gap-6 md:gap-10">
            <SearchOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <FavoriteBorderOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <ShoppingCartOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
        </section>
    );
};

export default ToolBar;
