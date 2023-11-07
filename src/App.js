import { Fragment } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts';
import { StompProvider } from './context/StompContext'; 
import { ConversationProvider } from './context/ConversationContext';
import { UserIdProvider } from './context/UserIdContext';
import { MessageProvider } from './context/MessageContext';
function App() {
    return (
        <StompProvider>
            <UserIdProvider>
                <ConversationProvider>
                    <MessageProvider>
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
                    </MessageProvider>
                </ConversationProvider>
            </UserIdProvider>
        </StompProvider>
    );
}

export default App;
