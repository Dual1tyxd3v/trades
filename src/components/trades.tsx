import { useCallback, useEffect, useState } from 'react';
import { getTrades } from '../utils/supabase';
import { TradesRows } from '../types';
import Loader from './loader';
import Empty from './empty';
import Menu from './menu';
import Trade from './trade';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--color-cell-bg);
  padding: 1rem 0;
  border: 2px solid var(--color-text);
  border-radius: 5px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 13%) 22%;
  font-weight: bold;
  font-size: 2rem;
  padding: 0 4rem 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-text);
`;

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
      {!trades?.length && <Empty />}
      <Menu refresh={refreshData} />
      {trades?.length ? (
        <Wrapper>
          <Header>
            <p>Дата</p>
            <p>Цена</p>
            <p>TP</p>
            <p>SL</p>
            <p>Тип сделки</p>
            <p>Пунктов</p>
            <p>Комментарий</p>
          </Header>
          {trades &&
            trades.map((trade, i) => {
              const key = `${i}_${trade.id}`;
              return <Trade data={trade} key={key} />;
            })}
        </Wrapper>
      ) : null}
    </div>
  );
}
