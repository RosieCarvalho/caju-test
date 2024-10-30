export const cpfNoMask = (value: string) => {
  if (!value) return;
  return value.replace(/\.|-/gm, '');
};
