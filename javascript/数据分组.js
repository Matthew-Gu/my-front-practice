const people = [
  { age: 20, name: 'John', gender: 'male' },
  { age: 25, name: 'Bob', gender: 'male' },
  { age: 30, name: 'Eva', gender: 'female' },
  { age: 25, name: 'Alice', gender: 'female' },
  { age: 30, name: 'Frank', gender: 'male' },
  { age: 35, name: 'Mat', gender: 'male' },
  { age: 30, name: 'Diana', gender: 'female' },
];

const arr = [12, 13, 24, 36, 65, 35, 19];

const groupBy = (arr, generateKey) => {
  if (typeof generateKey === 'string') {
    const propName = generateKey;
    generateKey = (item) => item[propName];
  }
  const result = {};
  for (const item of arr) {
    const key = generateKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
};
// 按性别分组
console.log(
  'gender1',
  groupBy(people, (item) => item.gender)
);
console.log('gender2', groupBy(people, 'gender'));
// 按年龄分组
console.log(
  'age',
  groupBy(people, (item) => item.age)
);
// 按年龄性别分组
console.log(
  'age-gender',
  groupBy(people, (item) => `${item.age}-${item.gender}`)
);
// 按奇偶分组
console.log(
  '奇偶',
  groupBy(arr, (item) => (item % 2 === 0 ? 'even' : 'odd'))
);
