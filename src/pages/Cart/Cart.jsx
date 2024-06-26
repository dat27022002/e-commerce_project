import { useEffect, useState } from 'react';
import { Box, Typography, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartItems from '../../components/cart/CartItems';
import OrderSummary from '../../components/cart/OrderSummary';
import CartService from '~/services/cartServices';
import UserService from '~/services/userService';
import notify from '~/utils/notify';
import RecipientInfoModal from '~/components/cart/RecipientInfoModal';

function Cart() {
    const [cart, setCart] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [currRecipient, setCurrRecipient] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isChange, setIsChange] = useState(false);

    const handleRemoveItem = async (variant_id) => {
        try {
            const response = await CartService.removeFromCart({ variant_id });
            if (response.code !== 200) {
                notify.error(response.message);
                return;
            }
            setCart((prevCart) => prevCart.filter((item) => item.id !== variant_id));
        } catch (error) {
            notify.error('An error occurred, please try again later');
        }
    };

    const handleAddRecipient = () => {
        setOpenModal(true);
        setIsChange(false);
    };

    const handleChangeRecipient = () => {
        setOpenModal(true);
        setIsChange(true);
    };

    const fetchCart = async () => {
        try {
            const response = await CartService.getFromCart();
            if (response.code !== 200) {
                notify.error(response.message);
                return;
            }
            setCart(response.data);
        } catch (error) {
            notify.error('An error occurred, please try again later');
        }
    };
    const fetchRecipients = async () => {
        try {
            const response = await UserService.getRecipientUser();
            if (response.code !== 200) {
                notify.error(response.message);
                return;
            }
            setRecipients(response.data);
            setCurrRecipient(response.data.find((item) => item.default_recipient));
        } catch (error) {
            notify.error('An error occurred, please try again later');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchCart(), fetchRecipients()]).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <Box className="flex gap-x-6 w-4/5 p-10">
            <RecipientInfoModal
                open={openModal}
                handleClose={() => {
                    setOpenModal(false);
                }}
                recipient={currRecipient}
                isChange={isChange}
                onUpdate={fetchRecipients}
            />
            <Box className="min-w-0 basis-8/12 space-y-6">
                <Typography variant="h4">My Cart</Typography>
                <Box className="border border-red-600 w-full rounded-[10px] p-4 shadow-lg flex gap-2">
                    <LocationOnIcon />
                    <Box className="space-y-2 w-full">
                        <Typography variant="h6">Delivery Address</Typography>
                        <Box className="flex flex-row gap-4 items-center justify-between w-full">
                            <FormControl className="w-1/2">
                                <InputLabel id="address">Address</InputLabel>
                                <Select
                                    labelId="address"
                                    value={currRecipient?.id || ''}
                                    label="Address"
                                    onChange={(event) => {
                                        const selectedRecipient = recipients.find(
                                            (item) => item.id === event.target.value,
                                        );
                                        setCurrRecipient(selectedRecipient);
                                    }}
                                >
                                    {recipients.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.address}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button disabled={recipients.length === 0} onClick={handleChangeRecipient}>
                                Change address
                            </Button>
                            <Button onClick={handleAddRecipient}>Add new address</Button>
                        </Box>
                    </Box>
                </Box>
                <Box className="flex flex-col gap-y-4 ">
                    <Box className="flex flex-col gap-y-4 px-2 py-4 bg-gray-100 rounded-lg">
                        <Box className="flex flex-row justify-between">
                            <Box className="flex flex-row justify-between gap-6">
                                <ShoppingBagIcon />
                                <Typography variant="h6">Product List</Typography>
                            </Box>
                        </Box>
                        {!isLoading && <CartItems cart={cart} onRemoveItem={handleRemoveItem} />}
                    </Box>
                </Box>
            </Box>
            <Box className="basis-4/12 space-y-6">
                <OrderSummary cart={cart} setCart={setCart} recipient={currRecipient} />
            </Box>
        </Box>
    );
}

export default Cart;
