import gsap from 'gsap';

export class Tools {
	static massiveRequire(req: __WebpackModuleApi.RequireContext): Asset[] {
		return req.keys().map((key: string) => ({
			key,
			data: req(key),
		}));
	}
}

export function wait(s: number): gsap.core.Tween {
	return gsap.delayedCall(s, () => {
	});
}

export function randomRange(min: number, max: number, random = Math.random): number {
	const a = Math.min(min, max);
	const b = Math.max(min, max);

	return a + (b - a) * random();
}


export function earthquake(target: { x: number; y: number }, power = 8, duration = 0.5): GSAPTween {
	const shake = { power };
	return gsap.to(shake, {
		power: 0,
		duration,
		ease: 'linear',
		onUpdate: () => {
			if (!target) return;
			target.x = randomRange(-shake.power, shake.power);
			target.y = randomRange(-shake.power, shake.power);
		},
	});
}