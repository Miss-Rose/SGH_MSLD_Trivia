import { Game } from 'game/Game';
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/all';
import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js';

import { AssetsLoader } from './AssetsLoader';
import { ResizeManager } from './ResizeManager';
import SoundManager from '../utils/SoundManager';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export class GameApp {
	public readonly app: Application;
	private readonly _view = <HTMLCanvasElement>document.getElementById('canvas');
	private readonly _loader: AssetsLoader;
	private readonly _resizeManager: ResizeManager;

	constructor() {
		this.app = new Application({
			view: this._view,
			backgroundColor: 0xffffff,
			resizeTo: window,
			antialias: true,
		});

		this._resizeManager = new ResizeManager(this.app);
		this._loader = new AssetsLoader(this.app.loader);

		/** PIXI devtools */
		globalThis.__PIXI_APP__ = this.app;
	}

	public async run(): Promise<void> {
		this._resizeManager.init();
		await this._loader.load();
		this.start();
	}

	private start(): void {
		const game = new Game();
		this.app.stage.addChild(game);
		SoundManager.init();
		this.app.resize();
		this._view.dataset.started = 'true';
	}

	public createAnimatedSprite(spriteSheetName: string): PIXI.AnimatedSprite {
		const spriteSheet = this._loader.spriteSheets[spriteSheetName];
		const [animation] = Object.keys(spriteSheet.animations);
		const animatedSprite = new PIXI.AnimatedSprite(spriteSheet.animations[animation]);
		animatedSprite.anchor.set(0.5);
		animatedSprite.animationSpeed = 0.2;
		animatedSprite.loop = false;
		return animatedSprite;
	}
}

export const App = new GameApp();
