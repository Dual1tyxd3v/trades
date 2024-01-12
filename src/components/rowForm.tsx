import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import { Status, TradesRow } from '../types';
import styled from 'styled-components';
import Button from './button';
import { FaRegFileAlt } from 'react-icons/fa';
import { createTrade, updateTrade } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import { getMove } from '../utils/moex';

const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  width: max-content;
  margin: 0 auto;
  background-color: var(--color-cell-bg);
  border-radius: 5px;
  border: 2px solid var(--color-text);
  padding: 1rem 2rem;

  & input,
  & textarea,
  & select {
    width: 30rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid var(--color-text);
    color: var(--color-text);
    background-color: var(--color-bg);
  }

  & textarea {
    height: 14rem;
    resize: none;
  }
`;

type FieldProps = {
  justify?: string;
  direction?: string;
};

const Field = styled.div<FieldProps>`
  display: flex;
  align-items: center; 
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  justify-content: ${(props) =>
    props.justify ? props.justify : 'space-between'};
  gap: 2rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & img {
    max-width: 50rem;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 2rem;
`;

const FileLabel = styled.label`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px dashed var(--color-text);
  border-radius: 10px;
  padding: 4rem 0;
  width: 90%;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    background-color: var(--color-bg);
    font-weight: bold;
  }

  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const Input = styled.input``;

type RowFormProps = {
  data?: TradesRow;
};

export default function RowForm({ data }: RowFormProps) {
  const { price, sl, tp, type, comment, img, date, lots, id } = data || {};
  const [fDate, setFDate] = useState(() =>
    date ? date.toString() : new Date().toISOString().slice(0, 10)
  );
  const [fType, setFType] = useState<null | string>(() => (type ? type : null));
  const [fPrice, setFPrice] = useState(() => (price ? price.toString() : '0'));
  const [fLots, setFLots] = useState(() => (lots ? lots.toString() : '0'));
  const [fTp, setTp] = useState(() => (tp ? tp.toString() : '0'));
  const [fSl, setSl] = useState(() => (sl ? sl.toString() : '0'));
  const [fComment, setFComment] = useState(() => (comment ? comment : ''));
  const [fFile, setFFile] = useState<null | File>(null);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<Status>({
    message: '',
    isSuccess: false,
  });
  const navigate = useNavigate();

  function changeHandler(e: ChangeEvent) {
    const input = e.target as HTMLInputElement | HTMLSelectElement;

    switch (input.name) {
      case 'date':
        setFDate(input.value.toString());
        break;
      case 'price':
        setFPrice(input.value);
        break;
      case 'lots':
        setFLots(input.value);
        break;
      case 'type':
        setFType(input.value);
        break;
      case 'tp':
        setTp(input.value);
        break;
      case 'sl':
        setSl(input.value);
        break;
      case 'comment':
        setFComment(input.value);
        break;
      case 'file':
        if (!(input as HTMLInputElement)?.files?.[0]) return;
        console.log((input as HTMLInputElement)?.files?.[0]);
        setFFile((input as HTMLInputElement)?.files?.[0] as File);
        break;

      default:
        return;
    }
  }

  function dropHandler(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFFile(e.dataTransfer.files[0]);
  }

  function dragHandler(isEnter: boolean, e: DragEvent) {
    e.preventDefault();
    setIsDragEnter(isEnter);
  }

  const closeModal = useCallback(
    () => setShowModal({ isSuccess: false, message: '' }),
    []
  );

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (isNaN(+fTp) || isNaN(+fSl) || isNaN(+fPrice)) return;
    setIsLoading(true);
    let resp: null | Status = null;
    if (!data) {
      resp = await createTrade(
        {
          tp: +fTp,
          sl: +fSl,
          comment: fComment,
          img: '',
          date: fDate,
          price: +fPrice,
          id: 0,
          type: fType as string,
          move: getMove(+fPrice, +fTp, +fSl),
          lots: +fLots,
        },
        fFile
      );
    } else {
      resp = await updateTrade(
        {
          tp: +fTp,
          sl: +fSl,
          comment: fComment,
          img: img ? img : '',
          date: fDate,
          price: +fPrice,
          id: id as number,
          type: fType as string,
          move: getMove(+fPrice, +fTp, +fSl),
          lots: +fLots,
        },
        fFile
      );
    }
    setIsLoading(false);
    setShowModal(resp);
  }

  function clickHandler() {
    closeModal();
    if (!showModal.isSuccess) return;
    navigate('/');
  }
  return (
    <>
      {showModal.message && (
        <Modal>
          <Text>{showModal.message}</Text>
          <Button bg="var(--color-bg)" onClick={clickHandler}>
            {showModal.isSuccess ? 'OK' : 'Пробовать еще'}
          </Button>
        </Modal>
      )}
      <Form onSubmit={submitHandler}>
        <Field className="field">
          <Label htmlFor="date">Дата</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={fDate}
            onChange={changeHandler}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="price">Цена открытия</Label>
          <Input
            type="text"
            name="price"
            id="price"
            value={fPrice}
            onChange={changeHandler}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="lots">Количество лотов</Label>
          <Input
            type="text"
            name="lots"
            id="lots"
            value={fLots}
            onChange={changeHandler}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="type">Тип сделки</Label>
          <select
            name="type"
            id="type"
            value={fType ? fType : ''}
            onChange={changeHandler}
          >
            {!fType && (
              <option value="" disabled hidden>
                Выберите тип сделки
              </option>
            )}
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </Field>
        <Field className="field">
          <Label htmlFor="tp">TP</Label>
          <Input
            type="text"
            name="tp"
            id="tp"
            value={fTp}
            onChange={changeHandler}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="sl">SL</Label>
          <Input
            type="text"
            name="sl"
            id="sl"
            value={fSl}
            onChange={changeHandler}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="comment">Комментарий</Label>
          <textarea
            name="comment"
            id="comment"
            value={fComment}
            onChange={changeHandler}
          />
        </Field>
        <Field direction="column">
          <FileLabel
            style={
              isDragEnter
                ? {
                    backgroundColor: 'var(--color-bg)',
                    fontWeight: 'bold',
                  }
                : {}
            }
            htmlFor="file"
            onDrop={dropHandler}
            onDragOver={(e) => dragHandler(true, e)}
            onDragEnter={(e) => dragHandler(true, e)}
            onDragLeave={(e) => dragHandler(false, e)}
          >
            Перетащите или выбирите изображение
            <FaRegFileAlt />
            {fFile && <span>{fFile.name}</span>}
          </FileLabel>
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="file"
            onChange={changeHandler}
          />
          {img && !fFile && <img src={img} alt="Old image" />}
        </Field>
        <Field justify="center">
          <Button bg="var(--color-cell-bg)" onClick={() => navigate('/')}>
            Назад
          </Button>
          <Button
            disabled={!+fPrice || !fType || !+fLots || isLoading}
            bg="var(--color-cell-bg)"
          >
            {data ? 'Обновить' : 'Создать'}
          </Button>
        </Field>
      </Form>
    </>
  );
}
