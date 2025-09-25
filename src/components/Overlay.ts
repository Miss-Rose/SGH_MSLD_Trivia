import { Graphics } from 'pixi.js';
import ScaleManager from '../utils/ScaleManager';
import gsap from 'gsap';

export class Overlay extends Graphics {
	private readonly SIZE = 960;

	constructor() {
		super();
		this.renderable = false;
		this.draw();
	}

	public resize(): void {
		this.scale.set(ScaleManager.COVER);
	}

	private draw(): void {
		this.beginFill(0x000000, 0.7)
			.drawRect(-this.SIZE / 2, -this.SIZE / 2, this.SIZE, this.SIZE)
			.endFill();
	}

	public show(): GSAPTween {
		this.renderable = true;
		return gsap.from(this, { alpha: 0, duration: 0.5 });
	}
}