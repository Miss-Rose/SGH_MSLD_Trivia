import { SpriteManager } from 'app/SpriteManger';
import { Sprite } from 'pixi.js';
import ScaleManager from 'utils/ScaleManager';

export class Background extends Sprite {
	constructor(textureName: string) {
		super();

		this.texture = SpriteManager.getTexture(`${textureName}.jpg`);
		this.anchor.set(0.5);
	}

	public resize(): void {
		this.scale.set(ScaleManager.COVER);
	}
}
