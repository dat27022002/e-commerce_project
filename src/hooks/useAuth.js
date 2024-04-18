import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import api from 'src/config/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {Dialog, CircularProgress} from '@mui/material'

const authContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if (user) {
            setUser(user);
        }
    }, []);

    const handleLogin = (data, callback = null) => {
        setLoading(true)
        axios
            .post(api.LOGIN, data)
            .then((res) => {
                const userData = {id: jwtDecode(res.data.data.token).id};
                window.localStorage.setItem('token', res.data.data.token);
                window.localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                if (callback) callback();
                setLoading(false)
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false)
            });
    };
    const handleSignUp = (req, callback = null) => {
        setLoading(true)
        axios
            .post(api.SIGNUP, req, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                toast.success('Create account successfully');
                if (callback) callback();
                setLoading(false)
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                setLoading(false)
            });
    };
    const handleLogout = (callback = null) => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setUser(null);
        if (callback) callback();
    };
    const handleLoginGG = (callback = null) => (res) => {
        setLoading(true)
        axios.post(api.LOGIN_BY_GG, {
            googleToken: res.accessToken
        })
        .then((response) => {
            window.localStorage.setItem('token', response.data.data.token);
            const userData = {...response.data.data.user, ...res.profileObj}
            window.localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
            if(callback) callback()
            setLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
        
    }
    const handle_verify_email = async (email, callback = null) => {
        try {
            setLoading(true)
            const res = await axios.post(api.VERIFY_EMAIL, {
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(callback){
                callback(res)
            }
            setLoading(false)
        } catch (err){
            setLoading(false)
            toast.error(err.message)
        }
    }
    const handle_verify_otp = (email, otp, callback=null) => {
        setLoading(true)
        axios.post(api.VERIFY_OTP, {
            email: email,
            otp_code: otp
        }).then((res) => {
            if(callback) callback(res)
            setLoading(false)
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false)
    })
    }
    const handleResetPwd = (email, otp, newPassword, callback=null) => {
        setLoading(true)
        axios.patch(api.RESET_PASSWORD, {
            email: email,
            otp_code: otp,
            newPassword: newPassword
        }).then((res) => {
            if(callback) callback(res)
            setLoading(false)
        }).catch((err) => {
        toast.error(err.message)
        setLoading(false)
    })
    }
    return (
        <authContext.Provider
            value={{
                user,
                setUser,
                login: handleLogin,
                logout: handleLogout,
                signUp: handleSignUp,
                handleLoginGG: handleLoginGG,
                verify_email: handle_verify_email,
                verify_otp: handle_verify_otp,
                resetPassword: handleResetPwd
            }}
        >
            {children}
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
            <ToastContainer />
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
