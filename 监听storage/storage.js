function sendMsg(type, payload) {
  localStorage.setItem(
    '$$' + type,
    JSON.stringify({
      payload,
      temp: Date.now(),
    })
  );
}

function listenMsg(handler) {
  const storageHandler = (e) => {
    const data = JSON.parse(e.newValue);
    handler(e.key.substring(2), data.payload);
  };
  // 只能跨标签页通信
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener('storage', storageHandler);
  };
}
