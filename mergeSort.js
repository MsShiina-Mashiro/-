let testArr = [5, 6, 1, 12, 4, 5, 8, 4, 61, 2, 3, 5, 4, 1, 23, 0, 5, 5, 1, 2];

const mergeSort = (arr, left, right) => {
  if (left === right) return;
  let mid = parseInt(left + ((right - left) >> 1));
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);

  let p1 = left;
  let i = 0;
  let p2 = mid + 1;
  let help = [];

  while (p1 <= mid && p2 <= right) {
    help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }
  while (p1 <= mid) {
    help[i++] = arr[p1++];
  }
  while (p2 <= mid) {
    help[i++] = arr[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    arr[left + i] = help[i];
  }
  return arr;
};


console.log(mergeSort(testArr, 0, testArr.length-1));