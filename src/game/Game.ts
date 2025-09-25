import { Background } from 'components/Background';
import { RESIZE } from 'eventsNames';
import { Container } from 'pixi.js';
import { PubSub } from 'utils/PubSub';
// import { Logo } from '../components/Logo';
import { Quiz } from './quiz/Quiz';
import ScaleManager from '../utils/ScaleManager';

export class Game extends Container {
	private readonly bg: Background;
	// private readonly logo: Logo;
	private readonly quiz: Quiz;

	constructor() {
		super();

		this.bg = new Background('bg');
		// this.logo = new Logo();
		this.quiz = new Quiz();
		this.addChild(
			this.bg,
			// this.logo,
			this.quiz,
		);

		PubSub.subscribe(RESIZE, this.resize.bind(this));

		this.start();
	}

	private async start(): Promise<void> {
	}

	private resize({ width, height, orientation }: ResizeOptions): void {
		this.bg.resize();
		this.quiz.scale.set(ScaleManager.CONTAIN);
		this.quiz.resize();
		// this.logo.resize({ width, height });
	}
}
