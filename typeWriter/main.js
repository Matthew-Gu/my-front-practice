class typeWriter {
  constructor(elementId) {
    this.element = document.querySelector(elementId); // 选中的标签
    this.queue = []; // 任务队列
    this.index = 0; // 当前任务索引
    this.typeSpeed = 300; // 打字间隔时间
    this.deleteSpeed = 150; // 删除间隔时间
    this.isDelete = false; // 当前删除状态
  }

  type(text, speed = this.typeSpeed) {
    this.queue.push({ type: 'type', text, speed });
    return this; // 实现链式调用
  }

  delete(length, speed = this.deleteSpeed) {
    this.queue.push({ type: 'delete', length, speed });
    return this; // 实现链式调用
  }

  pause(duration) {
    this.queue.push({ type: 'pause', duration });
    return this;
  }

  go() {
    this.executeNext();
  }

  executeNext() {
    if (this.index < this.queue.length) {
      let task = this.queue[this.index];
      switch (task.type) {
        case 'type':
          this.typeText(task.text, task.speed, () => {
            this.index++;
            this.executeNext();
          });
          break;
        case 'delete':
          this.deleteText(task.length, task.speed, () => {
            this.index++;
            this.executeNext();
          });
          break;
        case 'pause':
          setTimeout(() => {
            this.index++;
            this.executeNext();
          }, task.duration);
          break;
        default:
          break;
      }
    }
  }

  typeText(text, speed, callback) {
    let index = 0;
    const typeNextChar = () => {
      if (index < text.length) {
        this.element.textContent += text.charAt(index);
        index++;
        setTimeout(() => {
          typeNextChar();
        }, speed);
      } else {
        callback();
      }
    };
    typeNextChar();
  }

  deleteText(length, speed, callback) {
    let index = this.element.textContent.length;
    const deleteNextChar = () => {
      if (index > 0 && length > 0) {
        this.element.textContent = this.element.textContent.slice(0, index - 1);
        index--;
        length--;
        setTimeout(() => {
          deleteNextChar();
        }, speed);
      } else {
        callback();
      }
    };
    deleteNextChar();
  }
}

new typeWriter('#typeWriter')
  .type('红红火火恍恍惚惚')
  .pause(500)
  .delete(8)
  .type('哈哈哈哈哈哈哈哈')
  .pause(1000)
  .type('!')
  .go();
