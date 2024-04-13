import {Dialog, DialogTitle, DialogActions, DialogContent, FormHelperText, TextField, Button, Grid} from '@mui/material'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useEffect} from 'react'

const schema = yup.object().shape({
    name: yup.string().required(),
    phone_number: yup.string().matches(/^[0-9]{10,11}$/, 'Phone number is not valid').required(),
    address: yup.string().required(),
})

const EditAddressComponent = ({open, setOpen, onSave, init}) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        for(let [key, value] of Object.entries(init)){
            setValue(key, value)
        }
    }, [])
 return (
    <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Edit an address
            </DialogTitle>
            <DialogContent>
                    <Grid container spacing={4} marginTop={'-24px'}>
                    <Grid item xs={6}>
                        <Controller 
                            control={control}
                            name="name"
                            render={({field: {value, onChange}}) => 
                            <TextField value={value} onChange={onChange} label="Name" placeholder="Ho va ten" fullWidth/>
                        }
                        />
                        {errors.name && <FormHelperText color='red'>{errors.name.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={6}>
                        <Controller 
                            control={control}
                            name="phone_number"
                            render={({field: {value, onChange}}) => 
                            <TextField value={value} onChange={onChange} label="Phone Number" placeholder="So dien thoai" fullWidth/>
                        }
                        />
                        {errors.phone_number && <FormHelperText color='red'>{errors.phone_number.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <Controller 
                            control={control}
                            name="address"
                            render={({field: {value, onChange}}) => 
                            <TextField value={value} onChange={onChange} label="Address" placeholder="Tinh/Thanh pho, Quan/Huyen, Phuong/Xa, Duong, So nha" fullWidth/>
                        }
                        />
                        {errors.address && <FormHelperText color='red'>{errors.address.message}</FormHelperText>}
                    </Grid>
                    </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button onClick={() => setOpen(false)} variant='outlined' sx={{textTransform: 'none'}}>Cancle</Button>
                <Button onClick={handleSubmit(onSave)} variant='contained' sx={{textTransform: 'none'}}>Save</Button>
            </DialogActions>
        </Dialog>
 )
}
export default EditAddressComponent