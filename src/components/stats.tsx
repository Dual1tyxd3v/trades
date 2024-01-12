import styled from 'styled-components';
import { TradesRows } from '../types';

const List = styled.ul`
  display: flex;
  padding-left: 4rem;
  gap: 2rem;
`;
const Li = styled.li`
  font-size: 1.6rem;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2rem;
  }
`;

export default function Stats({ trades }: { trades: TradesRows }) {
  const finishedTrades = trades.filter((trade) => trade.tp || trade.sl);
  const totalTrades = finishedTrades.length;

  const profitTrades = finishedTrades.filter((trade) => trade.tp);
  const profitable = ((profitTrades.length * 100) / totalTrades).toFixed(2);

  const totalMove = finishedTrades.reduce((a, b) => a + b.move, 0);
  return (
    <List>
      <Li>
        <b>Закрыто сделок:</b> {totalTrades}
      </Li>
      <Li>
        <b>Процент прибыльных:</b> {profitable}%
      </Li>
      <Li>
        <b>Всего пунктов:</b> {totalMove}
      </Li>
    </List>
  );
}
