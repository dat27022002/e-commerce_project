import { Box, InputLabel, Paper, Select, Typography, FormControl, MenuItem, IconButton, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {
    const handleDeleteItem = () => {
        console.log('Delete item');
    };

    return (
        <Paper className="flex flex-row gap-4 p-4 rounded-lg items-center">
            <Box className="w-60 h-60 bg-gray-200 rounded-lg">
                <img src={item.product_image[0].image} alt={item.name} className="w-full h-full object-cover" />
            </Box>
            <Box className="flex flex-col gap-y-2 w-full ">
                <Typography variant="h6 ">{item.name}</Typography>
                <Box className="flex gap-4 w-full ">
                    <FormControl size="small" className="w-36">
                        <InputLabel id="quantity-label">Quantity</InputLabel>
                        <Select labelId="quantity-label" id="quantity" label="Quantity" defaultValue={1}>
                            {Array.from({ length: item.variants.remain_quantity }, (_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" className="w-36">
                        <InputLabel id="size-label">Size</InputLabel>
                        <Select labelId="size-label" id="size" label="Size" defaultValue={item.variants.size[0]}>
                            {item.variants.size.map((size, index) => (
                                <MenuItem key={index} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" className="w-36">
                        <InputLabel id="color-label">Color</InputLabel>
                        <Select labelId="color-label" id="color" label="Color" defaultValue={item.variants.color[0]}>
                            {item.variants.color.map((color, index) => (
                                <MenuItem key={index} value={color}>
                                    {color}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex gap-2 pt-6">
                    <Typography variant="body1">Price: {item.variants.price_sale}</Typography>
                    <Typography variant="body1" className="line-through text-red-600">
                        {item.variants.price_export}
                    </Typography>
                    <Typography variant="body1">
                        -{(100 * (item.variants.price_export - item.variants.price_sale)) / item.variants.price_export}%
                    </Typography>
                </Box>
                <Box className="flex gap-2 items-center pt-2">
                    <Typography variant="body2" className="items-center">
                        Rating:
                    </Typography>
                    <Rating name="read-only" value={item.avg_rating} readOnly precision={0.5} />
                </Box>
            </Box>
            <IconButton onClick={handleDeleteItem}>
                <DeleteIcon />
            </IconButton>
        </Paper>
    );
};

export default CartItem;
