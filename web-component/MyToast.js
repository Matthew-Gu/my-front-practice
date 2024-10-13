class MyToast extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    const template = document.createElement('template');
    template.innerHTML = `
            <style>
                .toast-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: center;
                    place-items: center;
                    z-index: 999;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }
                .toast-container.show {
                    opacity: 1;
                }
                .toast-content {
                    position: absolute;
                    left: 1em;
                    right: 1em;
                    width: fit-content;
                    margin: 0 auto;
                    color: #fff;
                    padding: 0.6em 0.8em;
                    border-radius: 0.8em;
                    background: rgba(0, 0, 0, 0.8);
                    user-select: none;
                    text-align:center;
                }
            </style>
            <div class="toast-container" style="display:none;">
                <div class="toast-content"></div>
            </div>
        `;
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.toastContainer = this.shadowRoot.querySelector('.toast-container');
    this.toastContent = this.shadowRoot.querySelector('.toast-content');
  }

  show(message, duration) {
    this.toastContent.textContent = message;
    this.toastContainer.style.display = '';
    // 触发过渡效果
    requestAnimationFrame(() => {
      this.toastContainer.classList.add('show');
    });
    if (duration) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.hide(), duration);
    }
  }

  hide() {
    this.toastContainer.classList.remove('show');
    this.toastContainer.addEventListener(
      'transitionend',
      () => {
        this.toastContainer.style.display = 'none';
        this.remove();
      },
      { once: true }
    );
  }
}

customElements.define('my-toast', MyToast);

const Toast = (() => {
  const show = (message, duration) => {
    const toast = document.createElement('my-toast');
    document.body.appendChild(toast);
    toast.show(message, duration);
  };

  return { show };
})();

export default Toast;
