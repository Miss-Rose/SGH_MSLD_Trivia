const LINKS = {
	IOS: 'https://apps.apple.com/app/solitaire-grand-harvest/id1223338261',
	ANDROID: 'https://play.google.com/store/apps/details?id=net.supertreat.solitaire',
};

function onSdkReady(viewableChangeHandler) {
	//@ts-expect-error mraid is not defined
	mraid.addEventListener('viewableChange', viewableChangeHandler);
	// Wait for the ad to become viewable for the first time

	//@ts-expect-error mraid is not defined
	if (mraid.isViewable()) {
		viewableChangeHandler(true);
	}
}

export function initUnity(viewableChangeHandler) {
	// Wait for the SDK to become ready
	//@ts-expect-error mraid is not defined
	if (mraid.getState() === 'loading') {
		//@ts-expect-error mraid is not defined
		mraid.addEventListener('ready', () => {
			onSdkReady(viewableChangeHandler);
		});
	} else {
		onSdkReady(viewableChangeHandler);
	}
}

export function setupCTAButton(button) {
	button.interactive = true;

	const userAgent = navigator.userAgent || navigator.vendor;
	const url = userAgent.toLowerCase().includes('android') ? LINKS.ANDROID : LINKS.IOS;
	button.on('pointerdown', () => {
		console.log('install');

		//@ts-expect-error mraid is not defined
		mraid.open(url);
		// FbPlayableAd.onCTAClick();
	});
}

export function openStore() {
	const userAgent = navigator.userAgent || navigator.vendor;
	const url = userAgent.toLowerCase().includes('android') ? LINKS.ANDROID : LINKS.IOS;
	console.log('install');
	//@ts-expect-error mraid is not defined
	mraid.open(url);
}
