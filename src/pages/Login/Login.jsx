import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
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
    Link,
} from '@mui/material';
import LoadingModal from '~/components/commons/loading-modal/loading-modal';
import { useAuth } from '~/hooks/useAuth';
import config from '~/config';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
function Login() {
    const [loading, setLoading] = useState(false);

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
    const auth = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = async (data) => {
        setLoading(true);
        await auth.login(data, () => {
            navigate(config.routes.HOME);
            setLoading(false);
        });
    };
    return (
        <Fragment>
            <Grid
                container
                sx={{ justifyContent: 'center', alignItem: 'center', minHeight: '100vh', paddingY: '30px' }}
            >
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
                                <GoogleLogin 
                                clientId = {process.env.REACT_APP_CLIENT_ID_GOOGLE}
                                onSuccess={auth.handleLoginGG(() => navigate(config.routes.HOME))} 
                                onError={(e) => console.log(e)}
                                />
                            </Grid>
                            <Link color="#b4282b" href="/forgot_password">Forgot password</Link>
                            <Link color="#b4282b" href="/signup">
                                Create account
                            </Link>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            {loading && <LoadingModal />}
        </Fragment>
    );
}

export default Login;
