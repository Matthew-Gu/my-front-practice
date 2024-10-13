// progressBar.js
// 定义一个 Vue 组件
const ProgressBar = {
  template: `<div id="progress-bar"></div>`,
  methods: {
    calcScrollPercent() {
      const readingProgressBar = document.querySelector('#progress-bar');
      window.addEventListener(
        'scroll',
        () => {
          if (readingProgressBar) {
            const contentHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = contentHeight > 0 ? Math.min((100 * window.scrollY) / contentHeight, 100) : 0;

            if (readingProgressBar) {
              readingProgressBar.style.setProperty('--progress', scrollPercent.toFixed(2) + '%');
            }
          }
        },
        {
          passive: true,
        }
      );
    },
  },
  mounted() {
    this.calcScrollPercent();
  },
};

// 导出组件
// export default ProgressBar;
