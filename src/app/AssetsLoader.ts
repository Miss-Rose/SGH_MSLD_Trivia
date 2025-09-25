import {BitmapFont, ISpritesheetData, Loader, Spritesheet} from 'pixi.js';
import Config from './Config';

export class AssetsLoader {
	public resources = {};
	public spriteSheets: Record<string, Spritesheet> = {};
	private _assets = Config.assets;


	constructor(private _loader: Loader) {
	}

	public async load(): Promise<void> {
		await this.preload();
		this.setupFonts();

		for (const { data } of Config.jsonData) {
			await this.parseSpriteSheet(data as unknown as ISpritesheetData);
		}
	}

	private preload(): Promise<void> {
		for (const asset of this._assets) {
			const key = asset.key.substring(asset.key.lastIndexOf('/') + 1);
			this._loader.add(key, asset.data);
		}

		return new Promise<void>(resolve => {
			this._loader.load(async (_, resources) => {
				this.resources = resources;
				resolve();
			});
		});
	}

	private async parseSpriteSheet(data: ISpritesheetData): Promise<Spritesheet> {
		const textureName = data.meta['image'];
		const spriteSheet = new Spritesheet(this.resources[textureName].texture.baseTexture, data);
		await spriteSheet.parse();
		this.spriteSheets[textureName] = spriteSheet;
		return spriteSheet;
	}

	private setupFonts(): void {
		const FONT_NAME = 'Mikado';

		const FONT_STYLE = {
			fontFamily: FONT_NAME,
			fill: 0xffffff,
		};

		const CHARACTERS = '/()+0123456789,!?.:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -\'"';

		BitmapFont.from(FONT_NAME, Object.assign(FONT_STYLE), { chars: CHARACTERS });
	}
}
