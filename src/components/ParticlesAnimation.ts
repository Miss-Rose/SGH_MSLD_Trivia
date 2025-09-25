import { Emitter, EmitterConfigV1, EmitterConfigV2, upgradeConfig } from '@pixi/particle-emitter';
import { Container, Texture } from 'pixi.js';

export class ParticleAnimation extends Container {
	public emitter!: Emitter;
	private _elapsed = 0;
	private _requestId?: number;

	constructor(private textures: Texture[], emitterConfig: EmitterConfigV2 | EmitterConfigV1) {
		super();
		this.init(emitterConfig);
	}

	private init(emitterConfig: EmitterConfigV2 | EmitterConfigV1): void {
		const particleConfig = upgradeConfig(emitterConfig, this.textures);

		if (this.textures.length > 1) {
			particleConfig.behaviors.push({
				type: 'animatedRandom',
				config: {
					anims: [
						{
							framerate: this.textures.length * 3,
							loop: true,
							textures: [...this.textures],
						},
					],
				},
			});
		}

		this.emitter = new Emitter(this, particleConfig);
	}

	public async play(): Promise<void> {
		this.emitter.emit = true;
		this._elapsed = Date.now();

		return new Promise(resolve => {
			const update = () => {
				this._requestId = requestAnimationFrame(update);
				const now = Date.now();
				this.emitter.update((now - this._elapsed) * 0.001);
				this._elapsed = now;

				if (!this.emitter.emit) {
					this.stopParticlesAnim();
					resolve();
				}
			};

			update();
		});
	}

	private stopParticlesAnim(): void {
		if (this._requestId && this.emitter.particleCount === 0) {
			this.emitter.emit = false;
			cancelAnimationFrame(this._requestId);
			this._requestId = undefined;
		}
	}
}
