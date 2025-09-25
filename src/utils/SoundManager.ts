import { Howl, Howler } from 'howler';
import { createMachine, interpret } from 'xstate';

const soundList = {
	// main: new Howl({
	// 	src: mainSound,
	// 	loop: true,
	// 	volume: 0.5,
	// }),
	//
	// cardTap: new Howl({
	// 	src: cardSound,
	// }),
	//
	// wind: new Howl({
	// 	src: windSound,
	// }),
	//
	// win: new Howl({
	// 	src: winSound,
	// }),
	//
	// wild: new Howl({
	// 	src: wildSound,
	// }),
};

const soundMachine = createMachine(
	{
		id: 'sound',
		initial: 'focused',
		predictableActionArguments: true,
		context: {},
		states: {
			focused: {
				initial: 'unmute',
				on: {
					UNFOCUS: 'unfocused',
				},
				states: {
					unmute: {
						entry: 'unmute',
						on: {
							MUTE: 'mute',
							TOGGLE_MUTE: 'mute',
						},
					},
					mute: {
						entry: 'mute',
						on: {
							UNMUTE: 'unmute',
							TOGGLE_MUTE: 'unmute',
						},
					},
					history: {
						type: 'history',
					},
				},
			},
			unfocused: {
				entry: 'pause',
				on: {
					FOCUS: 'focused.history',
				},
			},
		},
	},
	{
		actions: {
			pause: () => {
				Howler.mute(true);
			},
			mute: () => {
				Howler.mute(true);
			},
			unmute: () => {
				Howler.mute(false);
			},
		},
	},
);

const soundService = interpret(soundMachine).start();

function mute() {
	soundService.send('MUTE');
}

function unmute() {
	soundService.send('UNMUTE');
}

function unfocus() {
	soundService.send('UNFOCUS');
}

function focus() {
	soundService.send('FOCUS');
}

function init() {
	// soundList.main.play();
}

export default {
	soundService,
	soundList,
	init,
	unmute,
	mute,
	unfocus,
	focus,
};
