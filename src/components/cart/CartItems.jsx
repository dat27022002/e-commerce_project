import { Box, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatNumberWithCommas } from '~/utils/functions';

const CartItems = ({ cart, onRemoveItem }) => {
    return (
        <Box className="flex flex-col gap-4">
            {Array.isArray(cart) &&
                cart.length !== 0 &&
                cart.map((item) => (
                    <Paper key={item.id} className="flex flex-row gap-4 p-4 rounded-lg items-center">
                        <img
                            src={item.product.product_image[0]?.image}
                            alt={item.name}
                            className="w-1/6 h-full object-cover"
                        />
                        <Box className="flex flex-col gap-y-2 w-full ">
                            <Typography variant="h6" fontWeight="bold">
                                {item.product.name}
                            </Typography>
                            <Box className="flex gap-4 w-full items-center">
                                <Typography>Quantity: {item.quantity}</Typography>
                                <Typography>Size: {item.size}</Typography>
                                <Typography>Color:</Typography>
                                <Box
                                    sx={{
                                        border: '1px solid #000000',
                                        bgcolor: item.color.color_code,
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            </Box>
                            <Box className="flex gap-2 pt-6">
                                <Typography variant="body1">
                                    Price: {formatNumberWithCommas(item.price_sale)}đ
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={() => onRemoveItem(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Paper>
                ))}
        </Box>
    );
};

export default CartItems;
