import { useEffect } from 'react';
import styled from 'styled-components';
import { getOptions } from '../utils/moex';

const Head = styled.header`
  display: flex;
  align-items: center;
`;

export default function Header() {
  useEffect(() => {
    // const [options, positions] = await Promise.all(getOptions, getPositions);
    async function loadData() {
      const options = await getOptions();
      console.log(options);
    }
    loadData();
  }, []);
  return <Head></Head>;
}
