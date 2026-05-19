export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 0) return '';
  
  // Skip first digit if it starts with 7 or 8
  const startIdx = (numbers[0] === '7' || numbers[0] === '8') ? 1 : 0;
  const relevant = numbers.substring(startIdx).substring(0, 10);
  
  let formatted = '+7 ';
  if (relevant.length > 0) {
    formatted += relevant.substring(0, 3);
  }
  if (relevant.length > 3) {
    formatted += ' ' + relevant.substring(3, 6);
  }
  if (relevant.length > 6) {
    formatted += '-' + relevant.substring(6, 8);
  }
  if (relevant.length > 8) {
    formatted += '-' + relevant.substring(8, 10);
  }
  
  return formatted;
};
