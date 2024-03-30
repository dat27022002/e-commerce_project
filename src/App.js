import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes, authenticationRoutes } from './routes';
import { Fragment } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {authenticationRoutes.map((route) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
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
            </div>
        </Router>
    );
}

export default App;
