import { useEffect, useState } from 'react';
import { getUser } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { updateIsAuth } from '../store/actions';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function checkAuth() {
      setIsAuthLoading(true);
      const data = await getUser();
      setIsAuthLoading(false);
      if (!data) {
        dispatch(updateIsAuth(false));
        navigate('/login');
      } else {
        dispatch(updateIsAuth(true));
        navigate('/');
      }
    }
    checkAuth();
  }, []);
  return isAuthLoading;
};
