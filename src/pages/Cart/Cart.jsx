import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartItems from '../../components/cart/CartItems';
import OrderSummary from '../../components/cart/OrderSummary';
import CartService from '~/services/cartServices';

function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveItem = (variant_id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== variant_id));
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setIsLoading(true);
                const response = await CartService.getFromCart();
                if (!response.data) {
                }
                setCart(response.data);
                console.log(response.data);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, []);

    return (
        <Box className="flex gap-x-6 w-4/5 p-10">
            <Box className="min-w-0 basis-8/12 space-y-6">
                <Typography variant="h4">My Cart</Typography>
                <Box className="border border-red-600 w-full rounded-[10px] p-4 shadow-lg flex gap-2">
                    <LocationOnIcon />
                    <Box className="space-y-2">
                        <Typography variant="h6">Delivery Address</Typography>
                        <Typography variant="body2">No address selected</Typography>
                    </Box>
                </Box>
                <Box className="flex flex-col gap-y-4 ">
                    <Box className="flex flex-col gap-y-4 px-2 py-4 bg-gray-100 rounded-lg">
                        <Box className="flex flex-row gap-6">
                            <ShoppingBagIcon />
                            <Typography variant="h6">Product List</Typography>
                        </Box>
                        <CartItems cart={cart} onRemoveItem={handleRemoveItem} />
                    </Box>
                </Box>
            </Box>
            <Box className="basis-4/12 space-y-6">
                <Typography variant="h6">Cashback & Voucher</Typography>
                <Box className=" w-full rounded-[10px] p-4 shadow-lg flex gap-2">
                    <Box className="space-y-2">
                        <Typography variant="h6">No voucher apply</Typography>
                        <Typography variant="body2">No cashback earned</Typography>
                    </Box>
                </Box>
                <OrderSummary cart={cart} />
            </Box>
        </Box>
    );
}

export default Cart;
