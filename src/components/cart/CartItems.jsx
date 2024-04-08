import { Box, Paper, Typography, FormControl, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CartService from '~/services/cartServices';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const CartItems = ({ cart, onRemoveItem }) => {
    const handleRemoveItem = (variant_id) => {
        const fetchCart = async () => {
            try {
                const response = await CartService.removeFromCart({ variant_id });
                if (response.code !== 200) {
                    console.log(response.message);
                    toast.error('Xóa thất bại');
                    return;
                }
                toast.success('Thành công');
                onRemoveItem(variant_id);
            } catch (error) {
            } finally {
            }
        };
        fetchCart();
    };

    return (
        <Box className="flex flex-col gap-4">
            {Array.isArray(cart) &&
                cart.length !== 0 &&
                cart.map((item) => (
                    <Paper className="flex flex-row gap-4 p-4 rounded-lg items-center">
                        <ToastContainer />
                        <img
                            src={item.product.product_image[0].image}
                            alt={item.name}
                            className="w-1/6 h-full object-cover"
                        />
                        <Box className="flex flex-col gap-y-2 w-full ">
                            <Typography variant="h6 ">{item.product.name}</Typography>
                            <Box className="flex gap-4 w-full items-center">
                                <FormControl size="small" className="w-36">
                                    <TextField
                                        id="outlined-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        defaultValue={item.quantity}
                                        size="small"
                                    />
                                </FormControl>
                                <Typography>Size: {item.size}</Typography>
                                <Typography>Color: {item.color_id}</Typography>
                            </Box>
                            <Box className="flex gap-2 pt-6">
                                <Typography variant="body1">Price: {item.price_sale}</Typography>
                                <Typography variant="body1" className="line-through text-red-600">
                                    {item.price_export}
                                </Typography>
                                <Typography variant="body1">
                                    -{Math.floor((100 * (item.price_export - item.price_sale)) / item.price_export)}%
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Paper>
                ))}
        </Box>
    );
};

export default CartItems;
