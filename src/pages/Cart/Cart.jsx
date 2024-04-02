import { Box, Button, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';

const items = [
    {
        id: 1,
        name: 'Product 1',
        avg_rating: 4.5,
        product_image: [
            {
                image: 'https://dynamic.zacdn.com/iaA2n1fRWsifZUh17ximY6vp2xY=/filters:quality(70):format(webp)/https://static-sg.zacdn.com/p/guess-0514-5111253-1.jpg',
            },
        ],
        variants: {
            price_export: 100,
            price_sale: 90,
            remain_quantity: 10,
            size: ['S', 'M', 'L', 'XL'],
            color: ['Red', 'Blue', 'Green'],
        },
    },
];

function Cart() {
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
                        <Box className="flex flex-col gap-4">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </Box>
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
                <OrderSummary cart={items} />
            </Box>
        </Box>
    );
}

export default Cart;
