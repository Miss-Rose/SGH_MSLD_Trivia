export default {
	alpha: {
		start: 0,
		end: 0.9,
	},
	scale: {
		start: 0.2,
		end: 1.2,
		minimumScaleMultiplier: 1,
	},
	color: {
		start: '#fff0f0',
		end: '#ffffff',
	},
	speed: {
		start: 100,
		end: 200,
		minimumSpeedMultiplier: 1,
	},
	acceleration: {
		x: 0,
		y: 0,
	},
	maxSpeed: 0,
	startRotation: {
		min: 0,
		max: 360,
	},
	noRotation: false,
	rotationSpeed: {
		min: 0,
		max: 0,
	},
	lifetime: {
		min: 0.5,
		max: 1,
	},
	blendMode: 'normal',
	frequency: 0.008,
	emitterLifetime: 1,
	maxParticles: 20,
	pos: {
		x: 0,
		y: 0,
	},
	addAtBack: false,
	spawnType: 'ring',
	spawnCircle: {
		x: 0,
		y: 0,
		r: 300,
		minR: 200,
	},
};
