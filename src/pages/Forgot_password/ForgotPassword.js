import { Button, Card, CardActions, CardContent, CardHeader, TextField, Tabs, Tab, IconButton, FormHelperText} from "@mui/material"
import { useState } from "react"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAuth } from "~/hooks/useAuth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const RegExEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
const ForgotPassword = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState()
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorOTP, setErrorOTP] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    const [status, setStatus] = useState(0)
    const handleSubmitEmail = () => {
        if(email){
            if(RegExEmail.test(email)) {
                auth.verify_email(email, () => {
                    toast.success('OTP code sent to you. Please check your mail box!');
                    setStatus(status + 1)
                    setErrorEmail('done')
                })
            } else {
                setErrorEmail('Email is not valid!')
            }
        } else {
            setErrorEmail('Email is required!')
        }
    }
    const handleSubmitOtp = () => {
        if(errorEmail !== 'done'){
            setStatus(0)
            return
        }
        if(otp) {
            auth.verify_otp(email, otp, () => {
                setStatus(status + 1)
                setErrorOTP('done')
            })
        } else {
            setErrorOTP('OTP is required!')
        }
    }
    const handleSubmitPassword = () => {
        if(errorEmail !== 'done'){
            setStatus(0)
            return
        }
        if(errorOTP !== 'done'){
            setStatus(1)
            return
        }
        if(password) {
            auth.resetPassword(email, otp, password, () => {
                toast.success('Reset password successfully!');
                navigate('/login')
            })
        } else {
            setErrorPassword('Password is required!')
        }
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card sx={{width: '500px', textAlign: 'center', paddingX: 4, paddingBottom: 2}}>
            <CardHeader title="Đặt Lại Mật Khẩu"/>
            <Tabs value={status} onChange={(_, newValue) => setStatus(newValue)} aria-label="basic tabs example">
          <Tab label="Nhap Email" {...a11yProps(0)} />
          <Tab label="Xac nhan Email" {...a11yProps(1)} />
          <Tab label="Dat mat khau" {...a11yProps(2)} />
        </Tabs>
        {status === 0 && <>
                        <CardContent>
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" label="Email" fullWidth/>
                        {errorEmail && errorEmail !== 'done' && <FormHelperText color='red'>{errorEmail}</FormHelperText>}
                        </CardContent>
                        <CardActions sx={{justifyContent: 'flex-end'}}>
                            <Button onClick={handleSubmitEmail} >Tiếp theo</Button>
                        </CardActions>
                    </>}
                    {status === 1 && <>
                            <CardContent>
                            <TextField value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" label="OTP" fullWidth/>
                            {errorOTP && errorOTP !== 'done' && <FormHelperText>{errorOTP}</FormHelperText>}
                            </CardContent>
                            <CardActions sx={{justifyContent: 'space-between'}}>
                            <IconButton onClick={() => setStatus(status - 1)}><KeyboardBackspaceIcon /></IconButton>
                                <Button onClick={handleSubmitOtp}>Tiếp theo</Button>
                            </CardActions>
                        </>}
                        {status === 2 && <>
                                <CardContent>
                                <TextField value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" label="New Password" fullWidth/>
                                {errorPassword && errorPassword!== 'done' && <FormHelperText>{errorPassword}</FormHelperText>}
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button onClick={handleSubmitPassword} sx={{
                                        color: '#fff',
                                        backgroundColor: 'rgba(185, 28, 28, 0.8)',
                                        '&:hover': {
                                            backgroundColor: 'rgb(185, 28, 28)',
                                        },
                                    }}>Hoàn thành</Button>
                </CardActions>
                </>}
        </Card>
        </div>
    )
}
export default ForgotPassword