import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';
import { useCheckAuth } from './hooks/useCheckAuth';
import Loader from './components/loader';
import NewTrade from './pages/newTrade';
import Edit from './pages/edit';

function App() {
  const isAuthLoading = useCheckAuth();

  if (isAuthLoading) return <Loader />;
  return (
    <Routes>
      <Route element={<Main />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<NewTrade />} path="/new" />
      <Route element={<Edit />} path="/edit/:id" />
    </Routes>
  );
}

export default App;
