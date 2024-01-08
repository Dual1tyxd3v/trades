import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOptions, getPositions } from '../utils/moex';
import {
  getBalance,
  getGO,
  getStep,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { updateGO, updateStep } from '../store/actions';
import Loader from './loader';
import Positions from './positions';
import { PositionsType } from '../types';

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  flex-wrap: wrap;
  background-color: var(--color-cell-bg);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-text);
`;

type CellProps = {
  weight?: string;
};

const Cell = styled.p<CellProps>`
  font-size: 1.6rem;
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  padding: 0.4rem 0;
`;

export default function Header() {
  const dispatch = useAppDispatch();
  const go = useAppSelector(getGO);
  const step = useAppSelector(getStep);
  const balance = useAppSelector(getBalance);
  const [isLoading, setIsLoading] = useState(false);
  const [pos, setPos] = useState<null | PositionsType>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const options = await getOptions();
      const positions = await getPositions();

      setPos(positions);
      const { step, go } = options;
      dispatch(updateGO(go));
      dispatch(updateStep(step));
      setIsLoading(false);
    }
    loadData();
  }, [dispatch]);

  if (isLoading) return <Loader />;

  const freeLots = Math.floor(balance / Math.ceil(go));
  return (
    <>
      <Head>
        <Cell weight="bold">Гарантийное обеспечение</Cell>
        <Cell>{go}</Cell>
        {/* <Divider /> */}
        <Cell weight="bold">Шаг цены</Cell>
        <Cell>{step}</Cell>
        {/* <Divider /> */}
        <Cell weight="bold">Баланс</Cell>
        <Cell>{balance}</Cell>
        {/* <Divider /> */}
        <Cell weight="bold">Свободно лотов</Cell>
        <Cell>{freeLots}</Cell>
      </Head>
      {pos && <Positions data={pos} />}
    </>
  );
}
