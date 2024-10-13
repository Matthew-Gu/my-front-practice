// 冒泡排序
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        var temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

let arr1 = [1, 5, 3, 6, 4, 7, 2, 8, 0, 9];
let newarr1 = bubbleSort(arr1);
console.log('line 19', newarr1);

// 插入排序
function insertionSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var key = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

let arr2 = [1, 5, 3, 6, 4, 7, 2, 8, 0, 9];
let newarr2 = insertionSort(arr2);
console.log('line 38', newarr2);

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      continue;
    }
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

let arr3 = [1, 5, 3, 6, 4, 7, 2, 8, 0, 9];
let newarr3 = quickSort(arr3);
console.log('line 64', newarr3);

// 选择排序
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

let arr4 = [1, 5, 3, 6, 4, 7, 2, 8, 0, 9];
let newarr4 = selectionSort(arr4);
console.log('line 86', newarr4);

// 归并排序
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  function merge(left, right) {
    let result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  }

  return merge(mergeSort(left), mergeSort(right));
}

let arr5 = [1, 5, 3, 6, 4, 7, 2, 8, 0, 9];
let newarr5 = mergeSort(arr5);
console.log('line 122', newarr5);

// 获取数组中指定数量的随机项
function getRandomItems(arr, count) {
  let shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i-- > 0) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, count);
}

let arr = [1, 2, 3, 4, 5, 6, 7];
let randomItems = getRandomItems(arr, 3);
console.log('line 141', randomItems);
