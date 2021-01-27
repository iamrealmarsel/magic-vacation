export const randomInt = (upper) => {
  const lower = 0;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
