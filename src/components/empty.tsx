import styled from 'styled-components';

const Text = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export default function Empty() {
  return (
    <Wrapper>
      <Text>Пока что нет ни одной записи в базе данных.</Text>
      <Text>Воспользуйтесь меню чтобы добавить новую запись.</Text>
    </Wrapper>
  );
}
