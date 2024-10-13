function clone(value, deep = false) {
  const getType = (val) => Object.prototype.toString.call(val);

  const cloneHelper = (val) => {
    if (!val) return val;

    switch (getType(val)) {
      case '[object Object]': {
        const cloneObj = Object.create(Object.getPrototypeOf(val));
        Object.keys(val).forEach((key) => {
          cloneObj[key] = deep ? clone(val[key], true) : val[key];
        });
        return cloneObj;
      }
      case '[object Date]':
        return new Date(val.valueOf());
      case '[object RegExp]':
        return new RegExp(val);
      case '[object Array]': {
        return val.map((item) => (deep ? clone(item, true) : item));
      }
      case '[object Set]': {
        const cloneSet = new Set();
        val.forEach((item) => {
          cloneSet.add(deep ? clone(item, true) : item);
        });
        return cloneSet;
      }
      case '[object Map]': {
        const cloneMap = new Map();
        val.forEach((value, key) => {
          cloneMap.set(deep ? clone(key, true) : key, deep ? clone(value, true) : value);
        });
        return cloneMap;
      }
      default:
        return val;
    }
  };

  return cloneHelper(value);
}

const obj = { a: 1, b: { c: 2 } };
const shallowClone = clone(obj);
const deepClone = clone(obj, true);

// 修改对象数据
shallowClone.b.c = 3;
deepClone.b.c = 4;

// 打印原对象
console.log('obj', obj);
// 浅拷贝
console.log('shallow clone', shallowClone);
// 深拷贝
console.log('deep clone', deepClone);
