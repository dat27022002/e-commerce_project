import { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, FormControl, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserService from '~/services/userService';
import notify from '~/utils/notify';

const RecipientInfoModal = ({ open, handleClose, recipient, isChange }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = isChange
                ? await UserService.updateRecipient({
                      id_recipient: recipient.id,
                      name,
                      phone_number: phoneNumber,
                      address,
                      default_recipient: true,
                  })
                : await UserService.addRecipient({ name, phone_number: phoneNumber, address });
            if (response.code !== 200) {
                notify.warn('An error occurred, please try again later');
                return;
            }
            notify.success('Success');
            handleClose();
        } catch (error) {
            notify.error('An error occurred, please try again later');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isChange) {
            setName(recipient.name);
            setPhoneNumber(recipient.phone_number);
            setAddress(recipient.address);
        } else {
            setName('');
            setPhoneNumber('');
            setAddress('');
        }
    }, [isChange, recipient]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box className="flex flex-row justify-between items-center">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Recipient Info
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FormControl className="flex flex-col gap-2 pt-3">
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField
                        label="Phone number"
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPhoneNumber(value);
                            const phoneNumberPattern = /^[0-9]{10}$/;
                            if (!phoneNumberPattern.test(value)) {
                                setPhoneNumberError(true);
                            } else {
                                setPhoneNumberError(false);
                            }
                        }}
                        error={phoneNumberError}
                        helperText={phoneNumberError ? 'Invalid phone number' : ''}
                    />
                    <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    onClick={handleSave}
                    disabled={!name || !phoneNumber || !address || phoneNumberError || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? '' : 'Save'}
                </Button>
            </Box>
        </Modal>
    );
};
export default RecipientInfoModal;
