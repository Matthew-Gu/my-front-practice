const DialogComponent = Vue.defineComponent({
  props: {
    message: {
      type: String,
      default: '',
      required: false,
    },
    cancelBtnText: {
      type: String,
      default: '取消',
      required: false,
    },
    confirmBtnText: {
      type: String,
      default: '确认',
      required: false,
    },
    isShowCancelBtn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, { emit }) {
    const cancel = () => {
      emit('cancel');
    };

    const confirm = () => {
      emit('confirm');
    };

    return {
      props,
      cancel,
      confirm,
    };
  },
  template: `
      <div id="dialog-container">
        <div class="dialog-overlay"></div>
        <div class="dialog-wrapper">
          <div class="dialog-content">
            <div class="dialog-message">{{ props.message }}</div>
          </div>
          <div class="dialog-footer">
            <button v-if="props.isShowCancelBtn" type="button" class="dialog-button" @click="cancel">
              <div class="button-content">{{ cancelBtnText }}</div>
            </button>
            <button type="button" class="dialog-button" @click="confirm">
              <div class="button-content">{{ props.confirmBtnText }}</div>
            </button>
          </div>
        </div>
      </div>
    `,
});

let currentDialogApp = null;
let dialogContainer = null;

const showDialog = ({ message, cancelBtnText, confirmBtnText, isShowCancelBtn }) => {
  if (currentDialogApp) {
    currentDialogApp.unmount();
    document.body.removeChild(dialogContainer);
    currentDialogApp = null;
    dialogContainer = null;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  return new Promise((resolve, reject) => {
    const DialogApp = Vue.createApp({
      components: { DialogComponent },
      setup() {
        const handleConfirm = () => {
          resolve('confirm');
          close();
        };

        const handleCancel = () => {
          reject('cancel');
          close();
        };

        const close = () => {
          DialogApp.unmount();
          document.body.removeChild(container);
          currentDialogApp = null;
          dialogContainer = null;
        };

        return {
          handleConfirm,
          handleCancel,
        };
      },
      template: `
          <DialogComponent
            :message="message"
            :cancelBtnText="cancelBtnText"
            :confirmBtnText="confirmBtnText"
            :isShowCancelBtn="isShowCancelBtn"
            @confirm="handleConfirm"
            @cancel="handleCancel"
          />
        `,
      data() {
        return {
          message,
          cancelBtnText,
          confirmBtnText,
          isShowCancelBtn,
        };
      },
    });

    currentDialogApp = DialogApp;
    dialogContainer = container;
    DialogApp.mount(container);
  });
};

// const test = {
//   props: {
//     msg: {
//       type: String,
//       required: true,
//     },
//   },
//   render(ctx) {
//     const { $props, $emit } = ctx;
//     return <div>123</div>;
//   },
// };
