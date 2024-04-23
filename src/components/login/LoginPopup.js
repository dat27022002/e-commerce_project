import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Button,
    Dialog,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    Link,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import LoginWithGG from '~/components/login/LoginWithGG';
import { useAuth } from '~/hooks/useAuth';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
function LoginPopup({open, onClose, onSubmit}) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const auth = useAuth()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
                <Dialog
                    open={open}
                    onClose={onClose}
                    maxWidth='sm'
                    fullWidth
                >
                        <DialogTitle>
                        Login
                        </DialogTitle>
                            <DialogContent>
                            <Grid container flexDirection={'column'} gap="16px">
                                <FormControl>
                                    <FormLabel sx={{ fontSize: '14px', fontWeight: 700 }}>Email</FormLabel>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { value, onChange } }) => (
                                            <TextField value={value} onChange={onChange} />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.email.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            '&.Mui-focused': {
                                                color: '#0009',
                                            },
                                        }}
                                    >
                                        Password
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { value, onChange } }) => (
                                            <OutlinedInput
                                                value={value}
                                                onChange={onChange}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.password.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <Button
                                    variant="contained"
                                    onClick={handleSubmit(onSubmit)}
                                    sx={{
                                        textTransform: 'none',
                                        backgroundColor: 'rgba(185, 28, 28, 0.8)',
                                        '&:hover': {
                                            backgroundColor: 'rgb(185, 28, 28)',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <LoginWithGG callback={onClose}/>
                            </Grid>
                            <Grid item container justifyContent={'space-around'} marginTop={2}>
                            <Link color="#b4282b" href="/forgot_password" onClick={() => {
                                auth.savedRoute.current = location.pathname
                            }}>Forgot password</Link>
                            <Link color="#b4282b" href="/signup" onClick={() => {
                                auth.savedRoute.current = location.pathname
                            }}>
                                Create account
                            </Link>
                            </Grid>
                            </DialogContent>
                </Dialog>
    );
}

export default LoginPopup;
