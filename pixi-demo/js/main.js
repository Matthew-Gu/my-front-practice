const app = new PIXI.Application();
const fishContainer = new PIXI.Container();

let fishes = [];
let showBound = false;

const setup = async () => {
  await app.init({
    resizeTo: window,
  });
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  document.body.appendChild(app.canvas);
};

const preload = async () => {
  const assets = [
    { alias: 'bg', src: '../imgs/bg.jpg' },
    { alias: 'fish', src: '../imgs/fish.png' },
    { alias: 'bullet', src: '../imgs/bubble.png' },
    { alias: 'fish1', src: '../imgs/fish1.png' },
    { alias: 'fish2', src: '../imgs/fish2.png' },
    { alias: 'fish3', src: '../imgs/fish3.png' },
    { alias: 'fish4', src: '../imgs/fish4.png' },
    { alias: 'fish5', src: '../imgs/fish5.png' },
    { alias: 'basic1', src: '../imgs/bullet/basic/Explosion_1.png' },
    { alias: 'basic2', src: '../imgs/bullet/basic/Explosion_2.png' },
    { alias: 'basic3', src: '../imgs/bullet/basic/Explosion_3.png' },
    { alias: 'basic4', src: '../imgs/bullet/basic/Explosion_4.png' },
    { alias: 'basic5', src: '../imgs/bullet/basic/Explosion_5.png' },
    { alias: 'basic6', src: '../imgs/bullet/basic/Explosion_6.png' },
    { alias: 'basic7', src: '../imgs/bullet/basic/Explosion_7.png' },
    { alias: 'basic8', src: '../imgs/bullet/basic/Explosion_8.png' },
    { alias: 'basic9', src: '../imgs/bullet/basic/Explosion_9.png' },
    { alias: 'basic10', src: '../imgs/bullet/basic/Explosion_10.png' },
    { alias: 'lightning1', src: '../imgs/bullet/lightning/lightning_1.png' },
    { alias: 'lightning2', src: '../imgs/bullet/lightning/lightning_2.png' },
    { alias: 'lightning3', src: '../imgs/bullet/lightning/lightning_3.png' },
    { alias: 'lightning4', src: '../imgs/bullet/lightning/lightning_4.png' },
    { alias: 'lightning5', src: '../imgs/bullet/lightning/lightning_5.png' },
  ];
  await PIXI.Assets.load(assets);
};

const initialize = async () => {
  await setup();
  await preload();

  addSceneBackground(app);
  addPlayer(app);
  addFishes(app, fishes);

  app.ticker.add((time) => {
    animateFishes(app, fishes, time);
  });
};

const addPlayer = (app) => {
  const texture = PIXI.Texture.from('fish');
  const player = new PIXI.Sprite(texture);

  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  player.y = app.screen.height / 2;
  player.scale.set(0.5);
  player.zIndex = 1;

  app.stage.addChild(player);

  app.stage.addEventListener('pointermove', (event) => {
    const radians = Math.atan2(event.globalY - player.y, event.globalX - player.x);
    player.rotation = radians + Math.PI / 2;
  });
  app.stage.addEventListener('pointerdown', (event) => {
    if (event.button === 0) {
      basicAttack(player);
    } else if (event.button === 2) {
      castLightning(player);
    }
  });

  // 禁止默认的右键菜单弹出
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
};

const createAnimatedSpell = (
  player,
  imgList,
  damage = 5,
  speed = 5,
  scale = 0.1,
  anchorX = 0.5,
  anchorY = 0.5,
  rotationAdjustment = 0,
  loop = false,
  playOnCreate = true
) => {
  const textures = imgList.map((img) => PIXI.Texture.from(img));
  const spell = new PIXI.AnimatedSprite(textures);
  spell.anchor.set(anchorX, anchorY);
  if (showBound) {
    drawBoundingBox(spell, 'red', 0.3);
  }
  spell.scale.set(scale);
  spell.animationSpeed = 0.5;
  spell.loop = loop;

  app.stage.addChild(spell);

  spell.x = player.x;
  spell.y = player.y;
  spell.rotation = player.rotation + rotationAdjustment;

  if (playOnCreate) {
    spell.play();
  }

  const spellTicker = () => {
    const angle = spell.rotation - Math.PI / 2; // 调整角度
    spell.x += Math.cos(angle) * speed;
    spell.y += Math.sin(angle) * speed;

    fishes.forEach((fish) => {
      if (boundDetection(spell, fish)) {
        fish.alpha = 1;
        fish.health -= damage;
        fish.alpha = 0.3;
        if (!playOnCreate) {
          spell.play(); // 播放动画
        }
        app.ticker.remove(spellTicker); // 移除碰撞检测函数
        setTimeout(() => {
          fish.alpha = 1;
          app.stage.removeChild(spell); // 移除法术
        }, 300);
        if (fish.health <= 0) {
          fishContainer.removeChild(fish);
          fishes.splice(fishes.indexOf(fish), 1);
          console.log('fishes.length', fishes.length);
        }
      }
    });
    const isOut = isOutRange(spell, app);
    if (isOut) {
      app.ticker.remove(spellTicker); // 移除碰撞检测函数
      app.stage.removeChild(spell); // 移除法术
    }
  };

  spell.onComplete = () => {
    app.ticker.remove(spellTicker); // 移除碰撞检测函数
    app.stage.removeChild(spell);
  };

  app.ticker.add(spellTicker);
};

// 使用createAnimatedSpell函数创建基础攻击
const basicAttack = (player) => {
  // const bulletImgs = [
  //   'basic1',
  //   'basic2',
  //   'basic3',
  //   'basic4',
  //   'basic5',
  //   'basic6',
  //   'basic7',
  //   'basic8',
  //   'basic9',
  //   'basic10',
  // ];
  const bulletImgs = ['bullet'];
  createAnimatedSpell(player, bulletImgs, 5, 5, 0.5, 0.5, 0.5, 0, false, false);
};

// 使用createAnimatedSpell函数创建闪电法术
const castLightning = (player) => {
  const lightningImgs = ['lightning1', 'lightning2', 'lightning3', 'lightning4', 'lightning5'];
  createAnimatedSpell(player, lightningImgs, 5, 0, 0.5, 0.5, 0, Math.PI, false, true);
};

const addSceneBackground = (app) => {
  const background = PIXI.Sprite.from('bg');
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);
};

const addFishes = (app, fishes) => {
  // Add the fish container to the stage.
  app.stage.addChild(fishContainer);

  const fishCount = 20;
  const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];

  // Create a fish sprite for each fish.
  for (let i = 0; i < fishCount; i++) {
    // Cycle through the fish assets for each sprite.
    const fishAsset = fishAssets[i % fishAssets.length];

    // Create a fish sprite.
    const fish = PIXI.Sprite.from(fishAsset);

    if (showBound) {
      drawBoundingBox(fish, 'blue', 0.3);
    }

    // Center the sprite anchor.
    fish.anchor.set(0.5);

    // Assign additional properties for the animation.
    fish.direction = Math.random() * Math.PI * 2;
    fish.speed = 2 + Math.random() * 2;
    fish.turnSpeed = Math.random() - 0.8;
    fish.health = 5;

    // Randomly position the fish sprite around the stage.
    fish.x = Math.random() * app.screen.width;
    fish.y = Math.random() * app.screen.height;

    // Randomly scale the fish sprite to create some variety.
    fish.scale.set(0.5 + Math.random() * 0.2);

    // Add the fish sprite to the fish container.
    fishContainer.addChild(fish);

    // Add the fish sprite to the fish array.
    fishes.push(fish);
  }
};

const animateFishes = (app, fishes, time) => {
  // Extract the delta time from the Ticker object.
  const delta = time.deltaTime;

  // Define the padding around the stage where fishes are considered out of sight.
  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  // Iterate through each fish sprite.
  fishes.forEach((fish) => {
    // Animate the fish movement direction according to the turn speed.
    fish.direction += fish.turnSpeed * 0.01;

    // Animate the fish position according to the direction and speed.
    fish.x += Math.sin(fish.direction) * fish.speed;
    fish.y += Math.cos(fish.direction) * fish.speed;

    // Apply the fish rotation according to the direction.
    fish.rotation = -fish.direction - Math.PI / 2;

    // Wrap the fish position when it goes out of bounds.
    if (fish.x < -stagePadding) {
      fish.x += boundWidth;
    }
    if (fish.x > app.screen.width + stagePadding) {
      fish.x -= boundWidth;
    }
    if (fish.y < -stagePadding) {
      fish.y += boundHeight;
    }
    if (fish.y > app.screen.height + stagePadding) {
      fish.y -= boundHeight;
    }
  });
};

const drawBoundingBox = (sprite, color, alpha = 0.5) => {
  const graphics = new PIXI.Graphics();
  graphics.label = 'bound';

  graphics.beginFill(new PIXI.Color(color));
  graphics.drawRect(
    sprite.x - sprite.width / 2,
    sprite.y - sprite.height / 2,
    sprite.width,
    sprite.height
  );
  graphics.endFill();
  graphics.alpha = alpha;
  console.log('graphics', graphics.position);
  sprite.addChild(graphics); // 将边界添加到 sprite 的父容器中，以保持在正确的位置
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

const isOutRange = (bullet, app) => {
  if (bullet.x < 0 || bullet.x > app.screen.width || bullet.y < 0 || bullet.y > app.screen.height) {
    return true;
  }
  return false;
};

window.onload = () => {
  initialize();
};
