import { Grid, Typography, Divider, MenuList, MenuItem } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ProfileComponent from '~/components/profile/ProfileComponent';
import { useEffect } from 'react';
import httpRequest from 'src/utils/httpRequest';

function Profile() {
    useEffect(() => {
        (async () => {
            const res = await httpRequest.get('user/infor');
            console.log(res);
        })();
    }, []);
    return (
        <Grid container sx={{ height: '100vh', justifyContent: 'center', marginY: '30px' }}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} container flexDirection={'column'}>
                <Grid item container gap="12px">
                    <AccountCircleOutlinedIcon fontSize="large" />
                    <Typography>Thuy Trang</Typography>
                </Grid>
                <Divider />
                <MenuList>
                    <MenuItem sx={{ display: 'flex', gap: '8px' }}>
                        <PersonIcon /> My Account
                    </MenuItem>
                    <MenuItem sx={{ paddingLeft: '46px' }}>Profile</MenuItem>
                    <MenuItem sx={{ paddingLeft: '46px' }}>Address</MenuItem>
                </MenuList>
            </Grid>
            <Grid item xs={6}>
                <ProfileComponent />
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}

export default Profile;
