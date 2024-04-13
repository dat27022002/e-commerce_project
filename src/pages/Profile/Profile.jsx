import { Grid, Typography, Divider, MenuList, MenuItem, Dialog, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ProfileComponent from '~/components/profile/ProfileComponent';
import {useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AddressUserComponent from '~/components/profile/AddressUserComponent';
function Profile() {
    const [name, setName] = useState()
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false)
    return (
    <Grid container sx={{ height: '100vh', justifyContent: 'center', marginY: '30px' }} spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2} container flexDirection={'column'}>
                <Grid item container gap="12px" padding={'14px'} alignItems={'center'}>
                    <EditIcon sx={{height: 50, width: 'auto'}}/>
                    <div>
                    <Typography color='#0009' fontSize={18}>Edit Profile</Typography>
                    <Typography fontWeight={600} fontSize={14}>{name}</Typography>
                    </div>
                </Grid>
                <Divider />
                <MenuList>
                    <MenuItem sx={{ display: 'flex', gap: '8px' }} onClick={() => setTab(0)}>
                        <PersonIcon /> My Account
                    </MenuItem>
                    <MenuItem sx={{ paddingLeft: '46px', color: tab === 0? '#b4282b' : '#161823'}}
                    onClick={() => setTab(0)}
                    >Profile</MenuItem>
                    <MenuItem sx={{ paddingLeft: '46px', color: tab === 1? '#b4282b' : '#161823' }}
                    onClick={() => setTab(1)}
                    >Address</MenuItem>
                </MenuList>
            </Grid>
            <Grid item xs={8}>
                {(() => {
                    switch (tab){
                        case 0: 
                            return (
                                <ProfileComponent setName = {setName} setLoading={setLoading}/>
                            );
                        case 1:
                            return (
                                <AddressUserComponent setLoading={setLoading}/>
                            )
                        default: 
                            return (
                                <ProfileComponent />
                            );
                    }
                })()}
            </Grid>
            <Grid item xs={1}></Grid>
            <Dialog 
            fullWidth 
            maxWidth='lg' 
            open = {loading}
            PaperProps={{
                sx: {
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    border: 'none',
                    boxShadow: 'none',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }}
            >
                <CircularProgress sx={{color: '#ffff'}}/>
            </Dialog>
        </Grid>
    );
}

export default Profile;
