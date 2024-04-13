import { Add } from '@mui/icons-material'
import {Card, CardHeader, Button, Divider, CardContent, Grid, Typography} from '@mui/material'
import { useEffect, useState } from 'react'
import httpRequest from 'src/utils/httpRequest';
import {toast} from 'react-toastify';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddAddressComponent from './AddAddressComponent';
import EditAddressComponent from './EditAddressComponent';

const AddressUserComponent = ({setLoading}) => {
    const [addresses, setAddresses] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [editedAddress, setEditedAddress] = useState(null)

    const handleAdd = async(data) => {
        try{
            setLoading(true)
            const res = await httpRequest.post('user/recipient', data);
            if(res?.status === 200){
                toast.success('Add a new address successfully!')
                setOpenAdd(false)
                await fetchAddresses()
            } else {
                toast.error('Add an address faild!')
            }
            setLoading(false)
        } catch (err){
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }
    const handleEdit = async(data) => {
        try {
            setLoading(true)
            const res = await httpRequest.patch('user/recipient', {...data, id_recipient: data.id});
            if(res?.status === 200){
                toast.success('Edit the address successfully!')
                setOpenEdit(false)
                await fetchAddresses()
            } else {
                toast.error('Edit the address faild!')
            }
            setLoading(false)
        } catch (err) {
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }
    const handleDelete = async(id) => {
        if(window.confirm('Are you sure to delete this address?')){
            try{
                setLoading(true)
                const res = await httpRequest.delete(`user/recipient`, {params: {id_recipient: id}});
                if(res?.status === 200){
                    toast.success('Delete the address successfully!')
                    await fetchAddresses()
                } else {
                    toast.error('Delete the address faild!')
                }
                setLoading(false)
            } catch (err){
                toast.error(err.response.data.message)
                setLoading(false)
            }
        }
    }
    const handleSetDefault = async (id_new) => {
            try {
                setLoading(true)
                const default_old = addresses.find(item => item.default_recipient)
                if(default_old){
                    await httpRequest.patch('user/recipient', {...default_old, default_recipient: false, id_recipient: default_old.id})
                }
                const default_new = addresses.find(item => item.id === id_new)
                if(default_new){
                    await httpRequest.patch('user/recipient', {...default_new, default_recipient: true, id_recipient: default_new.id})
                }
                toast.success('Update successfully!')
                await fetchAddresses()
                setLoading(false)
            } catch (err){
                toast.error(err.message)
                setLoading(false)
            }
    }
    const fetchAddresses = async () => {
        try {
            setLoading(true)
            const res = await httpRequest.get('user/recipient');
            if(res?.status === 200){
                setAddresses(res.data.data)
            } else {
                toast.error('Err')
            }
            setLoading(false)
        } catch (err){
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAddresses()
    }, [])
    return (
        <>
        <Card sx={{backgroundColor: '#fef2f2', paddingX: '8px', paddingBottom: '8px'}}>
            <CardHeader 
            title={'My Address'}
            action={
                <Button sx={{
                    textTransform: 'none',
                    backgroundColor: '#e55757',
                    "&:hover": {
                        backgroundColor: '#b91c1c !important',
                    }
                }} 
                variant = 'contained' 
                startIcon={<Add />} 
                onClick={() => setOpenAdd(true)}
                >Add Address</Button>
            }
            sx={{padding: '24.5px'}}
            titleTypographyProps={{
                sx: {
                    fontSize: 18
                }
            }}
            />
            <Divider />
            <CardContent>
            {addresses?.map((item, index) => {
                    return (
            <Grid container justifyContent={'space-between'} key={`address-${index}`} sx={{
                borderTop: index !== 0 ? 'solid 1px #0000001f' : '',
                paddingY: 3
            }}>
                    <Grid item>
                    <Grid container sx={{minHeight: '40px'}} alignItems={'center'} gap={'8px'}>
                    <Typography sx={{verticalAlign: 'middle', fontWeight: 600, fontSize: 18}}>{item.name}</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{width: '1.5px'}}/>
                    <Typography sx={{verticalAlign: 'middle'}}>{item.phone_number}</Typography>
                    </Grid>
                    <Typography>{item.address}</Typography>
                    {item.default_recipient && <Typography color='#b4282b'>Default</Typography>}
                </Grid>
                  
                <Grid item sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <Grid container gap='5px'>
                    <Button sx={{textTransform: 'none'}} startIcon={<EditLocationOutlinedIcon />} onClick={() => {
                        setEditedAddress(addresses[index])
                        setOpenEdit(true)
                    }}>Edit</Button>
                    <Button sx={{textTransform: 'none'}} startIcon={<DeleteOutlineIcon />} disabled={addresses.length <= 1}
                    onClick={() => handleDelete(item.id)}
                    >Delete</Button>
                    </Grid>
                    <Button sx={{textTransform: 'none'}} startIcon={<SettingsOutlinedIcon />} disabled={item.default_recipient} variant='outlined'
                    onClick={() => handleSetDefault(item.id)}
                    >Set Default</Button>
                </Grid>
            </Grid>
              )
            })}
            </CardContent>
        </Card>
        {openAdd && <AddAddressComponent open={openAdd} setOpen={setOpenAdd} onSave={handleAdd}/>}
        {openEdit && <EditAddressComponent open={openEdit} setOpen={setOpenEdit} onSave={handleEdit} init={editedAddress}/>}
        </>
    )
}
export default AddressUserComponent