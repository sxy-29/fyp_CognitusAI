import { Route, Routes } from 'react-router';
import DataConnectorsPage from './pages/DataConnectorsPage';
import ChatsPage from './pages/chats/ChatsPage';
import NotebooksPage from './pages/NotebooksPage';
import FilesPage from './pages/FilesPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ChatsPage />} />
            <Route path="/notebooks" element={<NotebooksPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/dataConnectors" element={<DataConnectorsPage />} />
        </Routes>
    );
}

export default AppRoutes;