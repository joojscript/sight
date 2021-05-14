export default (min: number, max: number) => {
  const arr = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  return arr;
};
