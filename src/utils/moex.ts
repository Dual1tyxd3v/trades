export const getOptions = async () => {
  const resp = await fetch('https://moexapi.vercel.app/options');

  if (!resp.ok) {
    throw new Error('Cant load NG options');
  }

  const data = await resp.json();
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
