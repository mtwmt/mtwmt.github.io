// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) => {
      const d1 = new Date(a.data.update || a.data.date).valueOf();
      const d2 = new Date(b.data.update || b.data.date).valueOf();

      return d2 - d1
      // return (
      //   new Date(b.data.date && b.data.date).valueOf() -
      //   new Date(a.data.date && a.data.date).valueOf()
      // );
    }
      
  );
  return sortedArray;
};
