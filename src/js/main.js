import { Application, Assets, Graphics, Rectangle } from 'pixi.js';
import { assetsMap } from './assetsMap.js';
import { Tank } from './Tank.js';
import { Tween, TweenManager } from './Tween.js';

let app; // объявим в глобальной области

const runGame = () => {
  const marker = new Graphics();

  marker.fill({ color: 0xff0000, alpha: 1 });
  marker.circle(0, 0, 5);
  marker.fill();

  const tank = new Tank();

  app.stage.addChild(tank.view);
  app.stage.addChild(marker);
  app.stage.position.set(800 / 2, 800 / 2);

  window['TANK'] = tank;

  const tweenManager = new TweenManager(app.ticker);

  const moveTank = ({ data }) => {
    const distanceToCenter = data.getLocalPosition(app.stage);
    const distanceToTank = data.getLocalPosition(tank.view);
    const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

    let callAmount = 2;

    const move = () => {
      callAmount -= 1;
      if (callAmount <= 0) {
        tweenManager.createTween(
          tank,
          3000,
          { x: distanceToCenter.x, y: distanceToCenter.y },
          { onStart: () => tank.startTracks(), onFinish: () => tank.stopTracks() }
        );
      }
    };

    tweenManager.createTween(tank, 1000, { towerDirection: angle }, { onFinish: () => move() });
    tweenManager.createTween(
      tank,
      2000,
      { bodyDirection: angle },
      {
        onStart: () => tank.startTracks(),
        onFinish: () => {
          tank.stopTracks();
          move();
        },
      }
    );
  };

  app.stage.eventMode = 'static';
  app.stage.on('pointerdown', moveTank);

  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
};

async function start() {
  app = new Application();
  await app.init({ width: 800, height: 800, backgroundColor: 0x1099bb });

  document.body.appendChild(app.canvas);

  await Assets.load(assetsMap.sprites);

  runGame();
}

start();
