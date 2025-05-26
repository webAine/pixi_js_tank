import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';

export const createAnimatedSprite = (textureName, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const textures = textureName.map((name) => Texture.from(name));

  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);

  return animatedSprite;
};

export const createSprite = (textureName, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const sprite = new Sprite(Texture.from(textureName));

  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);

  return sprite;
};

export class Tank {
  constructor() {
    this._view = new Container();

    this._bodyContainer = new Container();
    this._view.addChild(this._bodyContainer);

    this._tracksLeft = createAnimatedSprite(['/assets/parts/tracks/TrackCFrame1.png', '/assets/parts/tracks/TrackCFrame2.png'], { x: 0, y: -80 });
    this._tracksRight = createAnimatedSprite(['/assets/parts/tracks/TrackCFrame1.png', '/assets/parts/tracks/TrackCFrame2.png'], { x: 0, y: 80 });
    this._tracksLeft.animationSpeed = 0.25;
    this._tracksRight.animationSpeed = 0.25;

    this._hull = new Sprite(Texture.from('/assets/parts/hulls/HeavyHullB.png'));
    this._hull.anchor.set(0.5);

    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight, this._hull);

    this._towerContainer = new Container();
    this._view.addChild(this._towerContainer);

    this._towerContainer.addChild(createSprite('/assets/parts/guns/HeavyGunB.png', { x: 140, y: -27 }));
    this._towerContainer.addChild(createSprite('/assets/parts/guns/HeavyGunB.png', { x: 160, y: 29 }));

    this._towerContainer.addChild(createSprite('/assets/parts/gun_connectors/GunConnectorD.png', { x: 80, y: 0 }));

    this._towerContainer.addChild(createSprite('/assets/parts/towers/HeavyTowerB.png'));
  }

  get view() {
    return this._view;
  }

  set towerDirection(value) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  set bodyDirection(value) {
    this._bodyContainer.rotation = value;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  get x() {
    return this._view.position.x;
  }

  set x(value) {
    return (this._view.position.x = value);
  }

  get y() {
    return this._view.position.y;
  }

  set y(value) {
    return (this._view.position.y = value);
  }

  startTracks() {
    this._tracksLeft.play();
    this._tracksRight.play();
  }

  stopTracks() {
    this._tracksLeft.stop();
    this._tracksRight.stop();
  }
}
