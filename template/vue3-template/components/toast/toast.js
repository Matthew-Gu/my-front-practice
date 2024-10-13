const ToastComponent = Vue.defineComponent({
  props: {
    message: String,
    duration: Number,
  },
  setup(props) {
    return { props };
  },
  template: `
    <div id="toast-container">
      <div class="toast">
        {{ props.message }}
      </div>
    </div>
    `,
});

let currentToastApp = null;
let toastContainer = null;
let toastTimeout = null;

const showToast = (message, duration = 3000) => {
  if (currentToastApp) {
    currentToastApp.unmount();
    if (toastContainer) {
      document.body.removeChild(toastContainer);
      toastContainer = null;
    }
    currentToastApp = null;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  const ToastApp = Vue.createApp(ToastComponent, {
    message,
    duration,
  });

  ToastApp.mount(container);
  currentToastApp = ToastApp;
  toastContainer = container;

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    if (currentToastApp) {
      currentToastApp.unmount();
      currentToastApp = null;
      if (toastContainer) {
        document.body.removeChild(toastContainer);
        toastContainer = null;
      }
    }
  }, duration);
};
