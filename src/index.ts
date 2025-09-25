import { App } from 'app/App';
import SoundManager from './utils/SoundManager';
import './font.scss';
// import { initUnity } from './utils/unity';

window.onload = () => {
	App.run();
	// initUnity(unityViewableChangeHandler);
};

document.addEventListener('visibilitychange', handleVisibilityChange);

function handleVisibilityChange() {
	if (document.visibilityState === 'visible') {
		SoundManager.soundService.send('UNMUTE');
	} else {
		SoundManager.soundService.send('MUTE');
	}
}

function unityViewableChangeHandler(viewable) {
	// start/pause/resume gameplay, stop/play sounds
	const game = document.querySelector('#canvas') as HTMLElement;

	if (viewable && game.dataset.started === 'false') {
		// initial start
		App.run();
	}

	if (viewable) {
		// can play audio/video
		SoundManager.unmute();
	} else {
		// can't play audio/video
		SoundManager.mute();
	}
}