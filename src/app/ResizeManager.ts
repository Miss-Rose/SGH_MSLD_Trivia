import { RESIZE } from 'eventsNames';
import { Application } from 'pixi.js';
import { PubSub } from 'utils/PubSub';
import ScaleManager from 'utils/ScaleManager';

export class ResizeManager {
	constructor(private _app: Application) {
	}

	public init(): void {
		PubSub.subscribe(RESIZE, ({ width, height }) => {
			this._app.stage.position.set(width / 2, height / 2);
			ScaleManager.setScreenSize({ width, height });
		});

		this._app.renderer.on(RESIZE, (width: number, height: number) => {
			const orientation: Orientation = width > height ? 'landscape' : 'portrait';
			PubSub.publish(RESIZE, { width, height, orientation });
		});
	}
}
