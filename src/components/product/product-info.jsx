import { useEffect, useState } from 'react';
import { formatNumberWithCommas } from '~/utils/functions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import classNames from 'classnames';
import CartService from '~/services/cartServices';
import notify from '~/utils/notify';
import CheckoutService from '~/services/checkoutService';
import UserService from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState();
    const [recipient, setRecipient] = useState();
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

    const handleAddToCart = () => {
        const addToCart = async () => {
            try {
                const response = await CartService.addToCart({ variant_id: selectedVariant.id, quantity });
                if (response.code !== 200) {
                    notify.error(response.message);
                    return;
                }
                notify.success('Added to cart');
            } catch (error) {
                notify.error('An error occurred, please try again later');
            }
        };
        if (!token) {
            navigate(config.routes.LOGIN);
            return;
        }
        addToCart();
    };

    const handleCreateOrder = () => {
        console.log(selectedVariant);
        const createOrder = async () => {
            try {
                const response = await CheckoutService.createOrderForProduct({
                    variant: { quantity, ...selectedVariant },
                    recipient,
                });
                if (response.code !== 200) {
                    notify.error(response.message);
                    return;
                }
                window.open(response.data.payment_link.checkoutUrl, '_blank');
            } catch (error) {
                notify.error('Checkout failed, please try again later');
            }
        };
        if (!token) {
            navigate(config.routes.LOGIN);
            return;
        }
        createOrder();
    };

    useEffect(() => {
        if (product) {
            setSelectedVariant(product?.variants?.[0]);
        }
    }, [product]);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await UserService.getRecipientUser();
                if (response.code !== 200) {
                    notify.error(response.message);
                    return;
                }
                setRecipient(response.data.find((item) => item.default_recipient));
            } catch (error) {
                notify.error('An error occurred, please try again later');
            }
        };
        if (token) fetchRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex gap-6 w-full rounded-2xl bg-white p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)]">
            <img
                src={product?.product_image?.[0]?.image}
                alt=""
                className="w-[450px] h-[450px] object-cover rounded-lg"
            />
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                <div className="w-full p-4 rounded-lg bg-red-100/70 flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <span className="text-slate-300 line-through text-base">
                            {formatNumberWithCommas(selectedVariant?.price_export)}đ
                        </span>
                        <div className="flex items-center bg-red-300 rounded-lg text-xs px-2 py-1">
                            Discount{' '}
                            {100 - Math.round((selectedVariant?.price_sale * 100) / selectedVariant?.price_export)}%
                        </div>
                    </div>
                    <span className="text-red-600 text-lg font-semibold">
                        {formatNumberWithCommas(selectedVariant?.price_sale)}đ
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-medium">Description</h2>
                    <ul className="w-full flex flex-col gap-2">
                        {product?.others?.map((other, idx) => (
                            <li className="text-sm" key={'other-' + idx}>
                                {other.name} : {other?.value}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-medium">Variants</h2>
                    <ul className="w-full flex items-center gap-2 flex-wrap">
                        {product?.variants?.map((variant, idx) => (
                            <li
                                className={classNames(
                                    'text-sm px-8 py-2 rounded-lg border border-solid border-slate-200 hover:cursor-pointer hover:bg-red-100/70 transition-all duration-200',
                                    selectedVariant?.id === variant?.id && 'bg-red-200',
                                )}
                                onClick={() => setSelectedVariant(variant)}
                                key={'variant-' + idx}
                            >
                                {variant?.size}
                            </li>
                        ))}
                    </ul>
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
                        onClick={handleAddToCart}
                    >
                        <LocalMallOutlinedIcon /> Add to cart
                    </Button>
                    <Button
                        className="w-full flex items-center gap-2 !bg-slate-600 !rounded-lg"
                        variant="contained"
                        onClick={handleCreateOrder}
                    >
                        Buy now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
