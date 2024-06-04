import { Box, Typography, Button, Divider } from '@mui/material';
import { formatNumberWithCommas } from '~/utils/functions';
import CheckoutService from '~/services/checkoutService';
import notify from '~/utils/notify';

const OrderSummary = ({ cart, setCart, recipient }) => {
    const handleCreatePaymentLink = async () => {
        try {
            const response = await CheckoutService.createOrderForCart({ cart, recipient });
            if (response.code !== 200) {
                notify.error(response.message);
                return;
            }
            window.open(response.data.payment_link.checkoutUrl, '_blank');
            setCart([]);
        } catch (error) {
            notify.error('Checkout failed, please try again later');
        }
    };

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
                            {formatNumberWithCommas(
                                cart.reduce((total, item) => total + item.price_sale * item.quantity, 0),
                            )}
                            đ
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="body1">Delivery Address</Typography>
                    <Box className="border border-red-600 w-full rounded-[10px] p-4 shadow-lg flex gap-2">
                        <Box className="space-y-2">
                            <Typography variant="body2">{recipient.address ?? 'No address selected'}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    {/* <Box className="flex justify-between">
                        <Typography variant="body1">Total Amount</Typography>
                        <Typography variant="body1">100</Typography>
                    </Box> */}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    className="w-full mt-4"
                    onClick={handleCreatePaymentLink}
                    disabled={cart.reduce((total, item) => total + item.price_sale * item.quantity, 0) === 0}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default OrderSummary;
