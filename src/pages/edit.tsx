import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrade } from '../utils/supabase';
import { TradesRow } from '../types';
import Loader from '../components/loader';
import Mode from '../components/mode';
import RowForm from '../components/rowForm';
import Title from '../components/title';
import Wrapper from '../components/wrapper';

export default function Edit() {
  const { id } = useParams();
  const [trade, setTrade] = useState<null | TradesRow>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loader() {
      setIsLoading(true);
      const data = await getTrade(id as string);
      !data && navigate('/');

      setTrade(data);
      setIsLoading(false);
    }
    loader();
  }, []);

  if (isLoading) return <Loader />;
  // const { date, price } = trade as TradesRow;

  return (
    <>
      <Mode />
      <Wrapper>
        <Title>Обновить запись</Title>
        <RowForm data={trade as TradesRow} />
      </Wrapper>
    </>
  );
}
