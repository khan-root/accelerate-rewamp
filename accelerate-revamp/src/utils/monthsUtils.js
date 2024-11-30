
export const  getAllMonths = ()=> {
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push({ id: i + 1, title: new Date(2000, i).toLocaleString('default', { month: 'long' }) });
  }
  return months;
}
