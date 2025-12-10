import { Route, Routes } from 'react-router';
import DataConnectorsPage from './pages/dataConnector/DataConnectorsPage';
import ChatsPage from './pages/chats/ChatsPage';
import NotebooksPage from './pages/NotebooksPage';
import FilesPage from './pages/FilesPage';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoutes';
import LoginForm from './pages/Login';

function AppRoutes() {
    return (
        <Routes>
            <Route
                path='/login'
                element={
                    <PublicRoute>
                        <LoginForm />
                    </PublicRoute>
                }
            />

            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <ChatsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/files"
                element={
                    <ProtectedRoute>
                        <FilesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/notebooks'
                element={
                    <ProtectedRoute>
                        <NotebooksPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dataConnectors"
                element={
                    <ProtectedRoute>
                        <DataConnectorsPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;