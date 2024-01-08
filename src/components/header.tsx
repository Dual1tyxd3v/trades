import { useEffect } from 'react';
import styled from 'styled-components';
import { getOptions, getPositions } from '../utils/moex';
import { useAppDispatch } from '../store';
import { updateGO, updateStep } from '../store/actions';

const Head = styled.header`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const [options, positions] = await Promise.all(getOptions, getPositions);
    async function loadData() {
      // const options = await getOptions();
      // console.log(options);
      /* const [options, positions] = await Promise.all([
        getOptions,
        getPositions,
      ]); */
      const options = await getOptions();
      const positions = await getPositions();
      console.log(positions);
      const { step, go } = options;
      dispatch(updateGO(go));
      dispatch(updateStep(step));
      console.log(step, go);
    }
    loadData();
  }, []);
  return <Head></Head>;
}
