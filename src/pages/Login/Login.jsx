import {
    Button,
    Card,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const auth = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = async (data) => {
        await auth.login(data, () => {
            navigate('/');
        });
    };
    return (
        // <div className={cx('bg-blue-100 text-8xl font-semibold w-screen h-[600px] flex items-center justify-center')}>
        //     LOGIN
        // </div>
        <Grid container sx={{ justifyContent: 'center', alignItem: 'center', minHeight: '100vh', paddingY: '30px' }}>
            <Card
                sx={{
                    maxWidth: '926px',
                }}
            >
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="images/Login.jpg"
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
                    >
                        <Typography variant="h5" fontWeight={700}>
                            Login
                        </Typography>
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

                            <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ textTransform: 'none' }}>
                                Login
                            </Button>
                        </Grid>
                        <Typography color="blue">Forgot password</Typography>
                        <Typography color="blue" onClick={() => navigate('/signup')}>
                            Create account
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}

export default Login;
