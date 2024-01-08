import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';
import { useCheckAuth } from './hooks/useCheckAuth';
import Loader from './components/loader';

function App() {
  const isAuthLoading = useCheckAuth();

  if (isAuthLoading) return <Loader />;
  return (
    <Routes>
      <Route element={<Main />} path="/" />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
