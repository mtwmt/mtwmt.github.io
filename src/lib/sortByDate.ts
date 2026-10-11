// sort by date
export const sortByDate = <T extends { data: { date: Date; update?: Date } }>(array: T[]): T[] => {
  const sortedArray = [...array].sort((a, b) => {
    const d1 = new Date(a.data.update || a.data.date).valueOf();
    const d2 = new Date(b.data.update || b.data.date).valueOf();

    return d2 - d1;
  });
  return sortedArray;
};
