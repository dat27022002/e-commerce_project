import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Checkout() {
    const query = useQuery();
    const status = query.get('status');
    const cancel = query.get('cancel');
    const orderCode = query.get('orderCode');
    const [statusTitle, setStatusTitle] = useState('Order Status');
    const [statusMessage, setStatusMessage] = useState('Checking your order status...');
    const [statusIcon, setStatusIcon] = useState(null);

    useEffect(() => {
        if (status === 'PAID' && cancel === 'false') {
            setStatusTitle('Order Successful');
            setStatusMessage('Your order has been placed successfully.');
            setStatusIcon(<CheckCircleIcon color="success" />);
            return;
        }
        if (status === 'CANCELLED') {
            setStatusTitle('Order Cancelled');
            setStatusMessage(`Your order: ${orderCode} has been cancelled.`);
            setStatusIcon(<CancelIcon color="error" />);
            return;
        }
        setStatusTitle('Order Status Unknown');
        setStatusMessage('We are unable to determine the status of your order.');
        setStatusIcon(<InfoIcon color="disabled" />);
    }, []);

    return (
        <Box className="flex items-center justify-center px-4">
            <Box className="max-w-md w-full bg-whiterounded-lg shadow-md p-6 space-y-4  text-center">
                <Box className="flex justify-center text-3xl">{statusIcon}</Box>
                <Typography className="text-xl font-bold text-zinc-800">{statusTitle}</Typography>
                <Typography className="text-zinc-600 dark:text-zinc-400">{statusMessage}</Typography>
            </Box>
        </Box>
    );
}

export default Checkout;
