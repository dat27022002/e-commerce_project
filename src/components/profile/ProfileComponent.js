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
    Button,
    CardActions,
    FormControl,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import httpRequest from 'src/utils/httpRequest';
import { toast } from 'react-toastify';

const defaultValues = {
    name: '',
    email: '',
    phone_number: '',
    sex: '',
    date_of_birth: new dayjs(),
    image: '',
};
const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup
        .string()
        .matches(/^[0-9]{10,11}$/, 'Phone number is not valid')
        .required(),
    sex: yup.string().required(),
    date_of_birth: yup.string().required(),
    image: yup.string().required(),
});
const ProfileComponent = ({ setName, setLoading }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
        setValue,
        getValues,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const inputRef = useRef(null);

    const uploadImage = async (value) => {
        setLoading(true);
        const file = value.target.files[0];
        if (file) {
            const form = new FormData();
            form.append('image', file);
            try {
                const res = await httpRequest.patch('user/image', form);
                if (res.status === 200) {
                    setValue('image', res.data.data.image);
                    toast.success('Upload image successfully!');
                } else {
                    toast.error('Submit image faild!');
                }
            } catch (err) {
                toast.error(err);
            }
        } else {
            toast.error('Upload faild!');
        }
        setLoading(false);
    };
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await httpRequest.patch('user/infor', data);
            if (res?.status === 200) {
                toast.success('Save success!');
            } else {
                toast.error('Save faild!');
            }
        } catch (err) {
            toast.error(err);
        }
        setLoading(false);
    };
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get('user/infor');
                if (res?.status === 200) {
                    for (let [key, value] of Object.entries(res.data.data)) {
                        setValue(key, value);
                    }
                    setName(res.data.data.name);
                }
            } catch (err) {
                toast.error(err);
            }
            setLoading(false);
        })();
    }, []);
    watch();
    return (
        <Card sx={{ backgroundColor: 'rgba(254, 242, 242, 0.5)', paddingX: '8px', paddingBottom: '8px' }}>
            <CardHeader
                title={'My Profile'}
                subheader="Quản lý thông tin hồ sơ để bảo mật tài khoản"
                avatar={
                    <Avatar sx={{ bgcolor: '#b4282b' }} aria-label="recipe">
                        {getValues('name') ? getValues('name')[0] : 'N/A'}
                    </Avatar>
                }
                titleTypographyProps={{
                    sx: {
                        fontSize: 18,
                    },
                }}
            />
            <Divider />
            <CardContent>
                <Grid container>
                    <Grid item xs={9} container flexDirection={'column'} spacing={4} paddingX={4}>
                        <Grid item container spacing={4} alignItems={'center'}>
                            <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                onChange={(e) => {
                                                    onChange(e);
                                                    setName(e.target.value);
                                                }}
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.name.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4} alignItems={'center'}>
                            <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                <Typography>Email</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { value, onChange } }) => (
                                            <TextField value={value} onChange={onChange} size="small" fullWidth />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.email.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4} alignItems={'center'}>
                            <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                <Typography>Phone Number</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="phone_number"
                                        render={({ field: { value, onChange } }) => (
                                            <TextField value={value} onChange={onChange} size="small" fullWidth />
                                        )}
                                    />
                                    {errors.phone_number && (
                                        <FormHelperText sx={{ color: 'red' }}>
                                            {errors.phone_number.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4} alignItems={'center'}>
                            <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                <Typography>Gender</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="sex"
                                        render={({ field: { value, onChange } }) => (
                                            <RadioGroup
                                                defaultValue="female"
                                                value={value}
                                                onChange={onChange}
                                                sx={{ flexDirection: 'row' }}
                                            >
                                                <FormControlLabel
                                                    value="female"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                '&.Mui-checked': {
                                                                    color: '#df383b',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                '&.Mui-checked': {
                                                                    color: '#df383b',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    value="other"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                '&.Mui-checked': {
                                                                    color: '#df383b',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Other"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.sex && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.sex.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4} alignItems={'center'}>
                            <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                <Typography>Birthday</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="date_of_birth"
                                        render={({ field: { value, onChange } }) => (
                                            <DatePicker
                                                value={dayjs(value)}
                                                onChange={onChange}
                                                defaultValue={dayjs()}
                                                onError={(err) => {
                                                    setError('date_of_birth', { type: 'custom', message: err });
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        helperText: errors?.date_of_birth?.message,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderLeft: 'solid 1px #0000001f',
                        }}
                    >
                        <Avatar src={getValues('image')} sx={{ height: 100, width: 100 }} />
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={uploadImage}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        <Button
                            variant="outlined"
                            onClick={() => {
                                inputRef.current.click();
                            }}
                            sx={{
                                textTransform: 'none',
                                borderColor: '#df383b',
                                color: '#df383b',
                                '&:hover': {
                                    backgroundColor: 'rgba(248, 148, 148, 0.1)',
                                    borderColor: '#df383b',
                                },
                            }}
                        >
                            Upload Photo
                        </Button>
                        {errors.image && <FormHelperText sx={{ color: 'red' }}>{errors.image.message}</FormHelperText>}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#e55757',
                        '&:hover': {
                            backgroundColor: '#b91c1c',
                        },
                    }}
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    Save
                </Button>
            </CardActions>
        </Card>
    );
};
export default ProfileComponent;
