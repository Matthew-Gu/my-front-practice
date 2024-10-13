import Toast from './MyToast.js';

const btn = document.querySelector('#btn');

btn.onclick = () => {
  Toast.show('this is a very very very very very very very long toast', 3000);
};
