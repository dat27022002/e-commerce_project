import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import api from 'src/config/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const authContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const handleLogin = (data, callback = null) => {
        axios
            .post(api.LOGIN, data)
            .then((res) => {
                // const token = jwtDecode(res.data.data.token);
                window.localStorage.setItem('token', res.data.data.token);
                window.localStorage.setItem('user', data);
                setUser(data);
                if (callback) callback();
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };
    const handleSignUp = (req, callback = null) => {
        axios
            .post(api.SIGNUP, req, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                toast.success('Create account successfully');
                if (callback) callback();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };
    const handleLogout = (callback = null) => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setUser(null);
        if (callback) callback();
    };
    return (
        <authContext.Provider
            value={{
                user,
                login: handleLogin,
                logout: handleLogout,
                signUp: handleSignUp,
            }}
        >
            {children}
            <ToastContainer />
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
