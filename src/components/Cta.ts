import { Container, Sprite } from 'pixi.js';
import { SpriteManager } from '../app/SpriteManger';
import ScaleManager from '../utils/ScaleManager';
import gsap from 'gsap';


export class Cta extends Container {
	private readonly _sprite: Sprite;

	constructor(name: string) {
		super();

		this._sprite = SpriteManager.createSprite(name);
		this._sprite.scale.set(0.9);
		this.addChild(this._sprite);
	}

	public resize({ width, height, orientation }: ResizeOptions): void {
		this.scale.set(ScaleManager.CONTAIN);

		if (orientation === 'landscape') {
			this._sprite.anchor.set(1);
			this.position.set(width / 2 - 10, height / 2 - 10);
			return;
		}
		this._sprite.anchor.set(0.5, 1);
		this.position.set(0, height / 2 - 5);
	}

	public pulse(): GSAPTween {
		return gsap.to(this._sprite, {
			pixi: { scale: '-=0.05' }, duration: 0.5,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
		});
	}


}
