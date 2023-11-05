import { Fragment } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts';
import { StompProvider } from './context/StompContext'; 

function App() {
    return (
        <StompProvider>
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
                </Routes>
            </div>
        </Router>
        </StompProvider>
    );
}

export default App;
