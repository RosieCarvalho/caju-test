export const isValidateNameComplet = (name: string) => {
  return String(name)
    .toLowerCase()
    .match(/^(?![0-9])(?=.*\s)(?=.*[a-zA-Z].*[a-zA-Z]).+$/);
};
