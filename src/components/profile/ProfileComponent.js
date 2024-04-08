import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';

const ProfileComponent = () => {
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
                    <Grid item>
                        <Typography></Typography>
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
export default ProfileComponent;
