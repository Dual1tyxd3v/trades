import { useCallback, useEffect, useState } from 'react';
import { getTrades } from '../utils/supabase';
import { TradesRows } from '../types';
import Loader from './loader';
import Empty from './empty';
import Menu from './menu';

export default function Trades() {
  const [trades, setTrades] = useState<null | TradesRows>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function loadTrades() {
      setIsLoading(true);
      const data = await getTrades();
      setIsLoading(false);
      data && setTrades(data);
    }

    loadTrades();
  }, [refresh]);

  const refreshData = useCallback(() => setRefresh((prev) => !prev), []);
  console.log(trades);
  if (isLoading) return <Loader />;
  return (
    <div>
      {!trades && <Empty />}
      <Menu refresh={refreshData} />
    </div>
  );
}
