const getOrdinalSuffix = (num: number) => {
  const suffixes = ['th', 'st🥇', 'nd🥈', 'rd🥉'];
  const remainder = num % 100;

  if(remainder >= 11 && remainder <= 13) {
    return `${num}th`;
  }
  const suffix = suffixes[num % 10] || 'th';
  return `${num}${suffix}`;
}

export default getOrdinalSuffix;