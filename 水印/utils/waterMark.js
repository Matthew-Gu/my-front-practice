const watermark = {};

const setWatermark = (str, targetDom) => {
  const id = 'watermark';

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }

  const can = document.createElement('canvas');
  can.width = 200;
  can.height = 100;

  const cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = '15px Vedana';
  cans.fillStyle = 'rgba(0, 0, 0, 0.30)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(str, can.width / 20, can.height);

  const div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = targetDom.offsetTop + 'px';
  div.style.left = targetDom.offsetLeft + 'px';
  div.style.position = 'fixed';
  div.style.zIndex = '100000';
  div.style.width = targetDom.clientWidth + 'px';
  div.style.height = targetDom.clientHeight + 'px';
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  document.body.appendChild(div);
  return id;
};

// 如果水印存在 展示水印 如果不存在 创建之后展示
// targetDom 是水印要盖住的元素
watermark.set = (str, targetDom) => {
  if (document.getElementById('watermark')) {
    document.getElementById('watermark').style.display = 'block';
  } else {
    let id = setWatermark(str, targetDom);
    const timer = setInterval(() => {
      if (document.getElementById(id) === null) {
        id = setWatermark(str, targetDom);
      } else {
        clearInterval(timer);
      }
    }, 2000);
    window.onresize = () => {
      setWatermark(str, targetDom);
    };
  }
};
// 页面切换时展示水印 因为项目组件是keep-alive的 所以在beforeRouteEnter的时候调这个
watermark.show = () => {
  if (document.getElementById('watermark')) {
    document.getElementById('watermark').style.display = 'block';
  }
};
// beforeRouteLeave切换其他页面时可能需要隐藏水印
watermark.hide = () => {
  document.getElementById('watermark').style.display = 'none';
};

export default watermark;
