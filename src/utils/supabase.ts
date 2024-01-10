import { createClient } from '@supabase/supabase-js';
import { EMAIL } from '../const';
import { TradesRow, TradesRows } from '../types';

const KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieXJubW10dmZzamdkanZzZ3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2MjMyMTQsImV4cCI6MjAyMDE5OTIxNH0.J4-rxmNjyRjpEYZxzRK4qruFNwrjaEA8-ZTQLlaI62o';
const SUPABASE_URL = 'https://cbyrnmmtvfsjgdjvsgxt.supabase.co';
const SUPABASE_STORAGE =
  'https://cbyrnmmtvfsjgdjvsgxt.supabase.co/storage/v1/object/public/imgs/';
export const supabase = createClient(SUPABASE_URL, KEY);

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error('Cant get user');

  return data.user;
};

export const login = async (pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: EMAIL,
    password: pass,
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const getTrades = async () => {
  const { data, error } = await supabase.from('trades').select('*');

  if (error) throw new Error('Cant load trades');

  return data as TradesRows;
};

export const uploadIMG = async (file: File) => {
  const { error } = await supabase.storage.from('imgs').upload(file.name, file);

  return error ? false : true;
};

export const createTrade = async (data: TradesRow, file?: File | null) => {
  if (file) {
    const resp = await uploadIMG(file);
    if (!resp)
      return { message: 'Не удается загрузить изображение', isSuccess: false };
  }
  const { tp, sl, comment, date, price, type, move, lots } = data;

  const { error: creteError } = await supabase
    .from('trades')
    .insert([
      {
        tp,
        sl,
        comment,
        date,
        price,
        type,
        img: file ? `${SUPABASE_STORAGE}${file.name}` : '',
        move,
        lots,
      },
    ])
    .select();

  if (creteError)
    return { message: 'Не удается создать запись', isSuccess: false };

  return { message: 'Сделка успешно записана', isSuccess: true };
};

export const deleteTrade = async (id: number) => {
  const { error } = await supabase.from('trades').delete().eq('id', id);

  if (error) return false;

  return true;
};

export const formatFileName = (path: string) => {
  console.log(path.slice(path.lastIndexOf('/')).slice(path.lastIndexOf('\\')));
};
