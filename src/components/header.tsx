import { useEffect } from 'react';
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

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  flex-wrap: wrap;
  background-color: var(--color-cell-bg);
`;

type CellProps = {
  weight?: string;
};

const Cell = styled.p<CellProps>`
  font-size: 1.6rem;
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  padding: 0.4rem 0;
`;

/* const Divider = styled.div`
  width: 1px;
  height: 2.6rem;
  background-color: var(--color-text);
`; */

export default function Header() {
  const dispatch = useAppDispatch();
  const go = useAppSelector(getGO);
  const step = useAppSelector(getStep);
  const balance = useAppSelector(getBalance);

  useEffect(() => {
    async function loadData() {
      const options = await getOptions();
      const positions = await getPositions();
      console.log(positions);
      const { step, go } = options;
      dispatch(updateGO(go));
      dispatch(updateStep(step));
    }
    loadData();
  }, [dispatch]);
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
        <Cell>x</Cell>
      </Head>
    </>
  );
}
