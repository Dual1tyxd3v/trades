/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { TradesRow } from '../types';
import { getTradeColor } from '../utils/moex';
import { useState } from 'react';

type WrapperProps = {
  color: string;
};

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(6, 13%) 22%;
  align-items: center;
  font-weight: bold;
  background-color: ${(props) => props.color};
  color: #000;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0 3rem;
  cursor: pointer;
  border: 1px solid var(--color-text);

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Cell = styled.p`
  font-size: 1.6rem;
`;

const Image = styled.img`
  grid-column: 1 / -1;
  max-width: 40rem;
  justify-self: center;
  margin: 1rem 0;
`;

export default function Trade({ data }: { data: TradesRow }) {
  const [showImage, setShowImage] = useState(false);
  const { tp, sl, price, comment, img, date, type, move } = data;
  const color = getTradeColor(data);
  return (
    <Wrapper color={color} onClick={() => setShowImage((prev) => !prev)}>
      <Cell>{date}</Cell>
      <Cell>{price.toFixed(3)}</Cell>
      <Cell>{tp?.toFixed(3)}</Cell>
      <Cell>{sl?.toFixed(3) || 0}</Cell>
      <Cell>{type}</Cell>
      <Cell>{move}</Cell>
      <Cell>{comment}</Cell>
      {showImage && img && <Image src={img} />}
    </Wrapper>
  );
}
