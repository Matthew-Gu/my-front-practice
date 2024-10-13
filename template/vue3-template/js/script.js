const { createApp, ref, reactive, onMounted } = Vue;

// console.log('styled', styled);

createApp({
  setup() {
    let list = ref([
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
    ]);

    const shuffleList = (list) => {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 生成随机索引
        [list[i], list[j]] = [list[j], list[i]]; // 交换元素
      }
      return list;
    };

    const moveFirstToLast = (list) => {
      const firstItem = list.shift(); // 移除第一项并返回
      list.push(firstItem); // 将移除的第一项添加到数组末尾
      return list;
    };

    const moveLastToFirst = (list) => {
      const lastItem = list.pop(); // 移除最后一项并返回
      list.unshift(lastItem); // 将移除的最后一项添加到数组开头
      return list;
    };

    const sortDescending = (list) => {
      return list.sort((a, b) => b.value - a.value);
    };

    const sortAscending = (list) => {
      return list.sort((a, b) => a.value - b.value);
    };

    const suiji = () => {
      list.value = shuffleList(list.value);
    };

    const toFirst = () => {
      list.value = moveLastToFirst(list.value);
    };

    const toLast = () => {
      list.value = moveFirstToLast(list.value);
    };

    const jiangxu = () => {
      list.value = sortDescending(list.value);
    };

    // 数组最后一项值加一

    const shengxu = () => {
      list.value = sortAscending(list.value);
    };

    onMounted(() => {});

    return { list, suiji, toFirst, toLast, jiangxu, shengxu };
  },
}).mount('#app');
