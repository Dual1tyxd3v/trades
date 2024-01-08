import { Options } from '../types';

export const getOptions = async () => {
  const resp = await fetch('https://moexapi.vercel.app/options');

  if (!resp.ok) {
    throw new Error('Cant load NG options');
  }

  const data: Options = await resp.json();
  return data;
};

export const getPositions = async () => {
  const resp = await fetch('https://moexapi.vercel.app/positions');

  if (!resp.ok) {
    throw new Error('Cant load NG positions');
  }

  const data = await resp.json();
  return data;
};

export const formatPositions = (pos: string) => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const res = [...pos].filter((char) => digits.includes(char)).join('');

  return +res;
};
