function sum(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

function demo() {
  // 前面的代码
  for (初始代码; 循环条件; 后置代码) {
    循环体;
  }
  // 后面的代码
}

function sum2(arr) {
  let result = 0; // 前面的代码
  let i = 0; // 初始代码
  const _m = () => {
    // 循环条件
    if (i < arr.length) {
      // 循环体
      result += arr[i];
      i++; // 更新条件
      _m();
    }
  };
  _m();
  // 后面的代码
  return result;
}

let arr = [1, 2, 3, 4, 5, 6];

console.log(sum(arr)); // 21
console.log(sum2(arr)); // 21
