let testArr = [5, 6, 1, 12, 4, 5, 8, 4, 61, 2, 3, 5, 4, 1, 23, 0, 5, 5, 1, 2];

let bubbleSort = (arr) => {
  let len = arr.length;
  let temp = 0;
  let i = len - 1;
  while (i > 0) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
    i--;
  }
  return arr;
};

console.log(bubbleSort(testArr));
