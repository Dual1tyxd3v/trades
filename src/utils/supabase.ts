import { createClient } from '@supabase/supabase-js';
import { EMAIL } from '../const';
import { TradesRows } from '../types';

const KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieXJubW10dmZzamdkanZzZ3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2MjMyMTQsImV4cCI6MjAyMDE5OTIxNH0.J4-rxmNjyRjpEYZxzRK4qruFNwrjaEA8-ZTQLlaI62o';
const SUPABASE_URL = 'https://cbyrnmmtvfsjgdjvsgxt.supabase.co';
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

export const formatFileName = (path: string) =>
  {
    console.log(path.slice(path.lastIndexOf('/')).slice(path.lastIndexOf('\\')))
  };
