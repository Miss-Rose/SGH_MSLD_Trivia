import { Container, Sprite } from 'pixi.js';
import { SpriteManager } from '../app/SpriteManger';
import gsap from 'gsap';

export class TextContainer extends Container {
	private readonly _text: Sprite;

	constructor(text: string) {
		super();
		this._text = SpriteManager.createSprite(text);
		this.addChild(this._text);
	}

	public show(delay: number, duration = 1): GSAPTween {
		return gsap.from(this._text, {
			alpha: 0,
			duration,
			pixi: { scale: 0 },
			ease: 'back.out(1.7)',
			y: '+=100',
			delay,
		});
	}


}