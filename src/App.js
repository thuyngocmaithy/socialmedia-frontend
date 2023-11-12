import { Fragment, useContext } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './layouts';
import { AccountLoginContext } from './context/AccountLoginContext';
import config from './config';
function App() {
    const userLogin = useContext(AccountLoginContext);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }

                        const Page = route.component;
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
                        let Layout = DefaultLayout;

                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }
                        const Page = route.component;
                        console.log(userLogin);
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    userLogin !== 0 ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        // Chuyển hướng đến trang đăng nhập
                                        <Navigate to={config.routes.login} replace={true} />
                                    )
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
