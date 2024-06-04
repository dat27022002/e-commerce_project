import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { publicRoutes, privateRoutes, authenticationRoutes } from './routes';
import { Fragment } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import AuthProvider from './hooks/useAuth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Layout = route.layout == null ? Fragment : route.layout;

                                const Page = route.element;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}

                            {privateRoutes.map((route, index) => {
                                const Layout = route.layout == null ? Fragment : route.layout;

                                const Page = route.element;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}

                            {authenticationRoutes.map((route, index) => {
                                const Layout = route.layout == null ? Fragment : route.layout;

                                const Page = route.element;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </LocalizationProvider>
                    </GoogleOAuthProvider>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
