import { useEffect, useState } from 'react';
import { getUser } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      setIsAuthLoading(true);
      const data = await getUser();
      setIsAuthLoading(false);
      if (!data) {
        navigate('/login');
      } else {
        navigate('/');
      }
    }
    checkAuth();
  }, []);
  return isAuthLoading;
};
