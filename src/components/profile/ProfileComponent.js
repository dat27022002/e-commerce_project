import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required(),
    phone_number: yup
        .string()
        .matches(/^[0-9]{10,11}$/, 'Phone number is not valid')
        .required(),
    gender: yup.string(),
    birthday: yup.string(),
    image: yup.string(),
});
const ProfileComponent = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <Card>
            <CardHeader
                title="Hồ Sơ Của Tôi"
                subheader="Quản lý thông tin hồ sơ để bảo mật tài khoản"
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                        R
                    </Avatar>
                }
            />
            <Divider />
            <CardContent>
                <Grid container>
                    <Grid item xs={8}>
                        <Grid item container>
                            <Grid item xs={3}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item xs={9}>
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
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={3}>
                                <Typography>Email</Typography>
                            </Grid>
                            <Grid item xs={9}>
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
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={3}>
                                <Typography>Phone Number</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Controller
                                    control={control}
                                    name="phone_number"
                                    render={({ field: { value, onChange } }) => (
                                        <TextField value={value} onChange={onChange} />
                                    )}
                                />
                                {errors.phone_number && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.phone_number.message}</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={3}>
                                <Typography>Gender</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Controller
                                    control={control}
                                    name="gender"
                                    render={({ field: { value, onChange } }) => (
                                        <RadioGroup
                                            defaultValue="female"
                                            value={value}
                                            onChange={onChange}
                                            sx={{ flexDirection: 'row' }}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.gender && (
                                    <FormHelperText sx={{ color: 'red' }}>{errors.gender.message}</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={3}>
                                <Typography>Birthday</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Controller
                                    control={control}
                                    name="birthday"
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            value={value}
                                            onChange={onChange}
                                            defaultValue={dayjs()}
                                            onError={(err) => {
                                                console.log(err);
                                                setError('birthday', { type: 'custom', message: err });
                                            }}
                                            slotProps={{
                                                textField: {
                                                    helperText: errors?.birthday?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Avatar />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
export default ProfileComponent;
