const qsStringify = (obj) => {
  // 检查是否为对象类型
  if (typeof obj !== 'object' || obj === null) {
    // 如果是非对象类型，直接返回其字符串形式
    if (typeof obj === 'string') {
      return encodeURIComponent(obj);
    } else {
      return String(obj);
    }
  }

  // 如果是数组类型
  if (Array.isArray(obj)) {
    return obj.map((item) => qsStringify(item)).join(',');
  }

  // 如果是普通对象类型
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${qsStringify(obj[key])}`)
    .join('&');
};

// 示例用法
const obj = {
  name: 'John',
  age: 30,
  isStudent: false,
  hobbies: ['reading', 'swimming', 'cooking'],
  address: {
    city: 'New York',
    zip: 10001,
  },
};

const queryString = qsStringify(obj);
console.log('line 36', queryString);

const qsParse = (queryString) => {
  // 检查是否为字符串类型
  if (typeof queryString !== 'string') {
    throw new Error('Input must be a string');
  }

  // 创建空对象用于存储解析后的键值对
  const result = {};

  // 将查询字符串分割成键值对数组
  const pairs = queryString.split('&');

  // 遍历键值对数组，解析成对象的属性和值
  pairs.forEach((pair) => {
    // 分割键值对
    const [key, value] = pair.split('=');

    // 对键和值进行解码
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    // 检查值是否是数组的形式（以逗号分隔）
    if (decodedValue.includes(',')) {
      // 将值拆分为数组
      result[decodedKey] = decodedValue.split(',');
    } else {
      result[decodedKey] = decodedValue;
    }
  });

  return result;
};

// 示例用法
const parsedObject = qsParse(queryString);
console.log('line 73', parsedObject);
