import { Container, Sprite } from 'pixi.js';
import ScaleManager from 'utils/ScaleManager';
import { SpriteManager } from '../app/SpriteManger';

export class Logo extends Container {
	private readonly _sprite: Sprite;
	private readonly MARGIN = 10;

	constructor() {
		super();
		this._sprite = SpriteManager.createSprite('Logo');
		this.addChild(this._sprite);
	}

	public resize({ width, height }: Size): void {
		this.scale.set(ScaleManager.CONTAIN);
		this._sprite.anchor.set(0);
		this.position.set(-width / 2 + this.MARGIN, -height / 2 + this.MARGIN);
	}
}
