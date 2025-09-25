import { Container, Sprite } from 'pixi.js';
import { SpriteManager } from '../app/SpriteManger';
import { AbstractCard } from '../game/Solitaire/AbstractCard';
import gsap from 'gsap';

export class HandHint extends Container {
	private readonly _hand: Sprite;

	constructor() {
		super();
		this.renderable = false;
		this._hand = SpriteManager.createSprite('hand');
		this._hand.anchor.set(0);
		this.addChild(this._hand);
	}

	public show(card: AbstractCard): void {
		this.renderable = true;
		this.moveTo(card);
		this.animate();
	}

	private animate(): GSAPTween {
		return gsap.to(this, {
			y: '-=15',
			x: '-=15',
			ease: 'power4.inOut',
			yoyo: true,
			repeat: -1,
		});
	}

	private moveTo(card: AbstractCard) {
		const position = this.toLocal(card.getGlobalPosition());
		this._hand.position.set(position.x, position.y);
	}

	public hide(): void {
		gsap.killTweensOf(this);
		this.renderable = false;
	}
}