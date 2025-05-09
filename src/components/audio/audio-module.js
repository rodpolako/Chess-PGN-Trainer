// ---------------
// Sound functions
// ---------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, document, window */
/* global Audio, SpeechSynthesisUtterance, speechSynthesis*/

/* eslint no-unused-vars: "error"*/
/* exported */

// -----------------------
// Sound-related variables
// -----------------------

const audioSourceRoot = './src/components/audio/sounds/';

const soundlist = [
	{ movetype: 'self', file: audioSourceRoot + 'move-self.mp3' },
	{ movetype: 'opponent', file: audioSourceRoot + 'move-opponent.mp3' },
	{ movetype: 'illegal', file: audioSourceRoot + 'illegal.mp3' },
	{ movetype: 'O-O', file: audioSourceRoot + 'castle.mp3' },
	{ movetype: 'x', file: audioSourceRoot + 'capture.mp3' },
	{ movetype: '+', file: audioSourceRoot + 'move-check.mp3' },
	{ movetype: '#', file: audioSourceRoot + 'game-end.mp3' },
];

const swapList = [
	{ piece: 'K', name: 'King ' },
	{ piece: 'Q', name: 'Queen ' },
	{ piece: 'B', name: 'Bishop ' },
	{ piece: 'R', name: 'Rook ' },
	{ piece: 'N', name: 'Knight ' },
	{ piece: 'x', name: ' takes ' },
	{ piece: '+', name: ' check' },
	{ piece: '#', name: ' checkmate' },
	{ piece: '=', name: ' promotes to ' },
	{ piece: 'O-O-O', name: 'Long castles' },
	{ piece: 'O-O', name: 'Short castles' },
	{ piece: '  ', name: ' ' },
];

// ---------------
// Sound functions
// ---------------

/**
 * Load the audio assets into memory
 */
function preloadAudio() {
	function loadAudio(url) {
		var audio = new Audio();
		audio.src = url;
		audio.preload = 'auto';
		audio.volume = 1;
		audio.muted = false;
		return audio;
	}

	soundlist.forEach((sound) => {
		sound.audio = loadAudio(sound.file);
	});
}

/**
 * Convert a move in SAN notation into text suitable for text-to-speech
 *
 * @param {text} sanMove The move to be spoken
 * @returns
 */
function SAN2SpeechText(sanMove) {
	let ttsText = sanMove;

	swapList.forEach((item) => {
		ttsText = ttsText.replaceAll(item.piece, item.name);
	});

	return ttsText;
}

/**
 * Speak the provided text
 *
 * @param {text} speechText The text to convert to sound
 */
async function speakNow(speechText) {
	speechText = SAN2SpeechText(speechText);
	//console.log(speechText);

	if ('speechSynthesis' in window) {
		const to_speak = new SpeechSynthesisUtterance(speechText);
		speechSynthesis.cancel();
		speechSynthesis.speak(to_speak);
	}
}

/**
 * Plays a sound
 *
 * @param {string} SANMove The algebraic notation of the move
 * @param {boolean} self Boolean to indicate if it is the player or opponent moving
 * @param {boolean} sounds Boolean to indicate if sound should play
 * @param {boolean} speech Boolean to indicate is move should be spoken
 */
async function playRelevantSound(SANMove, self = true, sounds = true, speech = true) {
	let soundToPlay = 'self'; // Default move sound

	if (self === false) {
		soundToPlay = 'opponent';
	}

	// Check the move against the list to see if it should be something else (check, castle, etc.)
	soundlist.forEach((sound) => {
		if (SANMove.includes(sound.movetype)) {
			soundToPlay = sound.movetype;
		}
	});

	// Lookup the required file to play based on the sound type and play it
	if (sounds) {
		let soundfile = soundlist.filter((item) => item.movetype === soundToPlay).map((item) => item);
		await soundfile[0].audio.play();
	}

	// Say the move.  This will stop any speech currently being played.
	if (speech) {
		await speakNow(SANMove);
	}
}

/**
 * Plays an error sound
 *
 * @param {boolean} sounds Flag indicates if the sound should be played
 */
function errorSound(sounds = false) {
	if (sounds) {
		let soundfile = soundlist.filter((item) => item.movetype === 'illegal').map((item) => item);
		soundfile[0].audio.play();
	}
}

/**
 * Preload the audio once the page is loaded
 */
$(document).ready(function () {
	preloadAudio();
});

export { playRelevantSound, errorSound, speakNow, preloadAudio };
