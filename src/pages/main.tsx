import { useCheckAuth } from '../hooks/useCheckAuth';
import { test } from '../utils/supabase';

export default function Main() {
  const isAuthLoading = useCheckAuth();

  if (isAuthLoading) return <p>Loading</p>;

  function clicker() {
    test();
  }
  return (
    <>
      <div>Main page</div>
      <button onClick={clicker}>Click</button>
    </>
  );
}
