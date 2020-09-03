let testArr = [5, 6, 1, 12, 4, 5, 8, 4, 61, 2, 3, 5, 4, 1, 23, 0, 5, 5, 1, 2];

const insertSort = (arr) => {
  if (!arr || arr.length <= 2) return arr;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i-1; j>=0 ; j--) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log(arr);
  return arr;
};

insertSort(testArr);
