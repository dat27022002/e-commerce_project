import { useState } from 'react';
import { formatNumberWithCommas } from '~/utils/functions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="flex gap-6 w-full rounded-2xl bg-white p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)]">
            <img src={product?.image} alt="" className="w-[450px] h-[450px] object-cover rounded-lg" />
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                <div className="w-full p-4 rounded-lg bg-red-100/70 flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <span className="text-slate-300 line-through text-base">
                            {formatNumberWithCommas(product?.listedPrice)}đ
                        </span>
                        <div className="flex items-center bg-red-300 rounded-lg text-xs px-2 py-1">
                            Discount
                            {100 - Math.round((product?.price * 100) / product?.listedPrice)}%
                        </div>
                    </div>
                    <span className="text-red-600 line-through text-lg font-semibold">
                        {formatNumberWithCommas(product?.price)}đ
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-medium">Quantity</h2>
                    <div className="flex items-center gap-6 rounded-lg border border-solid border-[#F0F0F0] w-fit p-2">
                        <RemoveIcon
                            className="w-[24px] text-[#8C8C8C] hover:cursor-pointer"
                            onClick={() => {
                                setQuantity((state) => (state <= 1 ? 1 : state - 1));
                            }}
                        />
                        <span className="text-sm font-medium">{quantity}</span>
                        <AddIcon
                            className="w-[24px] text-[#8C8C8C] hover:cursor-pointer"
                            onClick={() => {
                                setQuantity((state) => state + 1);
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center w-full gap-6">
                    <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 !border !border-solid !border-slate-300 !rounded-lg"
                    >
                        <LocalMallOutlinedIcon /> Add to cart
                    </Button>
                    <Button className="w-full flex items-center gap-2 !bg-slate-600 !rounded-lg" variant="contained">
                        Buy now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
