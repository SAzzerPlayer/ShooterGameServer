export const generate32SymbolsKey = () => {
  const symbols = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const amount = symbols.length;
  let key = '';
  for (let i = 0; i < 31; i++) {
    let symbolIndex = Math.round(Math.random() * amount);
    key += symbols[symbolIndex];
  }
  return key;
};
