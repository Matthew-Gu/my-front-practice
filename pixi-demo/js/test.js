const app = new PIXI.Application();

let box1, box2;

const setup = async () => {
  await app.init({
    background: '#1099bb',
    resizeTo: window,
  });
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  document.body.appendChild(app.canvas);
};

const preload = async () => {
  //   const texture = await PIXI.Assets.load("https://pixijs.com/assets/bunny.png");
  //   const bunny = new PIXI.Sprite(texture);
  //   app.stage.addChild(bunny);
  //   bunny.anchor.set(0.5);
  //   bunny.x = app.screen.width / 2;
  //   bunny.y = app.screen.height / 2;
};

const addBox1 = () => {
  box1 = new PIXI.Graphics();
  box1.beginFill(0x0000ff); // 蓝色
  box1.drawRect(0, 0, 100, 100); // 正方形大小和位置
  box1.endFill();

  box1.alpha = 0.3;

  box1.x = (app.screen.width - box1.width) / 2; // 居中
  box1.y = (app.screen.height - box1.height) / 2; // 居中

  app.stage.addChild(box1);
};

const addBox2 = () => {
  box2 = new PIXI.Graphics();
  // graphics.anchor.set(0.5);
  box2.beginFill(0xff0000); // 蓝色
  box2.drawRect(0, 0, 100, 100); // 正方形大小和位置
  box2.pivot.set(50, 50);
  box2.endFill();

  box2.alpha = 0.3;

  box2.x = app.screen.width / 2; // 居中
  box2.y = app.screen.height / 2; // 居中
  app.stage.addChild(box2);

  app.stage.addEventListener('pointermove', (event) => {
    box2.x = event.clientX;
    box2.y = event.clientY;
  });

  app.ticker.add((time) => {
    // box2.rotation += 0.1 * time.deltaTime;
    let isHit = boundDetection(box1, box2);
    if (isHit) {
      box1.alpha = 1;
      box2.alpha = 1;
    } else {
      box1.alpha = 0.3;
      box2.alpha = 0.3;
    }
  });
};

const initialize = async () => {
  await setup();
  await preload();
  addBox1();
  addBox2();
};

const boundDetection = (obj1, obj2) => {
  const bounds1 = obj1.getBounds();
  const bounds2 = obj2.getBounds();
  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
};

window.onload = () => {
  initialize();
};
