import { formatNumberWithCommas } from '~/utils/functions';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [onHover, setOnHover] = useState(false);
    return (
        <div
            className="w-full flex flex-col hover:cursor-pointer border border-solid border-[F5F5F5] rounded-2xl overflow-hidden shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)]"
            onClick={() => navigate('/products/' + product?.id)}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
        >
            <img
                src={product?.image}
                alt=""
                className={classNames('w-full aspect-square object-cover rounded-2xl', onHover && 'p-1')}
            />
            <div className="flex flex-col p-4 gap-2">
                <h1 className="text-lg font-semibold">{product?.name}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className=" text-slate-400 line-through text-sm">
                            {formatNumberWithCommas(product?.listedPrice)}đ
                        </span>
                        <span className=" text-red-700">{formatNumberWithCommas(product?.price)}đ</span>
                    </div>
                    <AddCircleRoundedIcon className="w-[32px]" />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
