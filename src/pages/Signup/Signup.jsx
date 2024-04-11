import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from '~/hooks/useAuth';
import {
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';

import config from '~/config';

// const cx = classNames;
const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required(),
    phoneNumber: yup
        .string()
        .trim()
        .matches(/^[0-9]{10,11}$/, 'Phone number is not valid')
        .required(),
    password: yup.string().required(),
    confirmPW: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    isAgree: yup.boolean().required(),
});

function Signup() {
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPW, setShowConfirmPW] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = async (data) => {
        await auth.signUp({
            email: data.email,
            password: data.password,
            passwordConfirmation: data.confirmPW,
            phone_number: data.phoneNumber,
        });
        navigate(config.routes.LOGIN);
    };
    return (
        <Grid container sx={{ justifyContent: 'center', alignItem: 'center', minHeight: '100vh', paddingY: '30px' }}>
            <Card
                sx={{
                    maxWidth: '926px',
                }}
            >
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="images/Register.jpg"
                            alt=""
                            style={{
                                height: '100%',
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        flexDirection="column"
                        xs={12}
                        sm={6}
                        justifyContent={'space-around'}
                        sx={{
                            padding: 6,
                        }}
                        gap="16px"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            Register
                        </Typography>
                        <Grid container flexDirection={'column'} gap="16px">
                            <FormControl>
                                <FormLabel sx={{ fontSize: '14px', fontWeight: 700 }}>Name</FormLabel>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { value, onChange } }) => (
                                        <TextField value={value} onChange={onChange} />
                                    )}
                                />
                                {errors.name && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.name.message}</FormHelperText>
                                )}
                            </FormControl>

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
                                <FormLabel sx={{ fontSize: '14px', fontWeight: 700 }}>Phone number</FormLabel>
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field: { value, onChange } }) => (
                                        <TextField value={value} onChange={onChange} />
                                    )}
                                />
                                {errors.phoneNumber && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.phoneNumber.message}</FormHelperText>
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
                                    Confirm Password
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="confirmPW"
                                    render={({ field: { value, onChange } }) => (
                                        <OutlinedInput
                                            value={value}
                                            onChange={onChange}
                                            type={showConfirmPW ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPW(!showConfirmPW)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPW ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                {errors.confirmPW && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.confirmPW.message}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl>
                                <Controller
                                    control={control}
                                    name="isAgree"
                                    render={({ field: { value, onChange } }) => (
                                        <FormControlLabel
                                            control={<Checkbox checked={value} onChange={onChange} />}
                                            label={
                                                <p>
                                                    I agree to the{' '}
                                                    <a href="/" style={{ color: 'blue' }}>
                                                        Privacy policy
                                                    </a>
                                                </p>
                                            }
                                        />
                                    )}
                                />
                                {errors.isAgree && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.isAgree.message}</FormHelperText>
                                )}
                            </FormControl>
                            <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ textTransform: 'none' }}>
                                Create Account
                            </Button>
                        </Grid>

                        <Typography>
                            Already have an acount?{' '}
                            <a href="/login" style={{ color: 'blue' }}>
                                Login
                            </a>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}

export default Signup;
