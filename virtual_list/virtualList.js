document.addEventListener('DOMContentLoaded', function () {
  const listContainer = document.getElementById('virtuallist-container');
  const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

  const itemHeights = new Array(items.length).fill(50); // 初始高度
  let totalHeight = itemHeights.reduce((sum, height) => sum + height, 0);
  const bufferSize = 2; // 额外渲染的项目数

  const phantom = document.createElement('div');
  phantom.className = 'phantom';
  phantom.style.height = `${totalHeight}px`;
  listContainer.appendChild(phantom);

  const visibleItems = [];

  const updateVisibleItems = () => {
    const scrollTop = listContainer.scrollTop;
    const containerHeight = listContainer.clientHeight;

    let start = 0;
    let accumulatedHeight = 0;

    // 找到起始项目
    while (start < items.length && accumulatedHeight < scrollTop) {
      accumulatedHeight += itemHeights[start];
      start++;
    }

    let end = start;
    accumulatedHeight = 0;

    // 找到结束项目
    while (end < items.length && accumulatedHeight < containerHeight) {
      accumulatedHeight += itemHeights[end];
      end++;
    }

    // 添加缓冲区
    start = Math.max(0, start - bufferSize);
    end = Math.min(items.length, end + bufferSize);

    // 移除之前的项目
    visibleItems.forEach((item) => listContainer.removeChild(item));
    visibleItems.length = 0;

    let topOffset = 0;

    // 添加可见项目
    for (let i = 0; i < start; i++) {
      topOffset += itemHeights[i];
    }

    for (let i = start; i < end; i++) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'list-item';
      itemDiv.textContent = items[i];
      itemDiv.style.top = `${topOffset}px`;
      itemDiv.style.height = `${itemHeights[i]}px`;
      listContainer.appendChild(itemDiv);
      visibleItems.push(itemDiv);
      topOffset += itemHeights[i];
    }
  };

  listContainer.addEventListener('scroll', updateVisibleItems);

  updateVisibleItems();
});
