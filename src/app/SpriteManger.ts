import { Sprite, Texture } from 'pixi.js';

export class SpriteManager {
	public static createSprite(spriteName: string, position = { x: 0, y: 0 }): Sprite {
		const sprite = Sprite.from(this.getTexture(spriteName));
		sprite.position.copyFrom(position);
		sprite.anchor.set(0.5);
		return sprite;
	}

	public static getTexture(textureName: string): Texture {
		return Texture.from(textureName);
	}
}
