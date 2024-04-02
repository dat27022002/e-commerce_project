import { Box, Typography, Button, Divider, Paper } from '@mui/material';

const OrderSummary = ({ cart }) => {
    return (
        <Box className="flex flex-col gap-2">
            <Typography variant="h6">Order Summary</Typography>
            <Box className="flex flex-col gap-4 w-full rounded-[10px] p-4 shadow-lg">
                <Box className="flex flex-col gap-2">
                    <Box className="flex justify-between">
                        <Typography variant="" className="font-bold">
                            Total Price
                        </Typography>
                        <Typography variant="" className="font-bold">
                            100
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="body1">Delivery Address</Typography>
                    <Box className="border border-red-600 w-full rounded-[10px] p-4 shadow-lg flex gap-2">
                        <Box className="space-y-2">
                            <Typography variant="body2">No address selected</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="flex justify-between">
                        <Typography variant="body1">Total Amount</Typography>
                        <Typography variant="body1">100</Typography>
                    </Box>
                </Box>
                <Button variant="contained" color="primary" className="w-full mt-4">
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default OrderSummary;
