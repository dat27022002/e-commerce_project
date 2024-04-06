import { useContext, useState } from 'react';
import { createContext } from 'react';
import api from 'src/config/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const authContext = createContext(null);

export function Auth() {
    const [user, setUser] = useState(null);
    const handleLogin = (data, callback = null) => {
        axios
            .post(api.LOGIN, data)
            .then((res) => {
                const token = jwtDecode(res.data.data.token);
                window.localStorage.setItem('token', JSON.stringify(token));
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
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setUser(null);
    };
    return {
        user,
        login: handleLogin,
        logout: handleLogout,
        signUp: handleSignUp,
    };
}

export default function AuthProvider({ children }) {
    const auth = Auth();

    return (
        <authContext.Provider value={auth}>
            {children}
            <ToastContainer />
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
