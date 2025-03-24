// ---------------
// Sound functions
// ---------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global Audio, window, SpeechSynthesisUtterance, speechSynthesis, $, document, board */

/* eslint no-unused-vars: "error"*/
/* exported playRelevantSound, errorSound */

// Sound-related variables

const soundlist = [
	{ movetype: "default", file: "./sounds/move-self.mp3" },
	{ movetype: "oppdefault", file: "./sounds/move-opponent.mp3" },
	{ movetype: "illegal", file: "./sounds/illegal.mp3" },
	{ movetype: "O-O", file: "./sounds/castle.mp3" },
	{ movetype: "x", file: "./sounds/capture.mp3" },
	{ movetype: "+", file: "./sounds/move-check.mp3" },
	{ movetype: "#", file: "./sounds/game-end.mp3" },
];

function preloadAudio() {
	function loadAudio(url) {
		var audio = new Audio();
		audio.src = url;
		audio.preload = "auto";
		audio.volume = 1;
		audio.muted = false;
		return audio;
	}

	soundlist.forEach((sound) => {
		sound.audio = loadAudio(sound.file);
	});
}

function SAN2SpeechText(sanMove) {
	let ttsText = sanMove;

	const swapList = [
		{ piece: "K", name: "King " },
		{ piece: "Q", name: "Queen " },
		{ piece: "B", name: "Bishop " },
		{ piece: "R", name: "Rook " },
		{ piece: "N", name: "Knight " },
		{ piece: "x", name: " takes " },
		{ piece: "+", name: " check" },
		{ piece: "#", name: " checkmate" },
		{ piece: "=", name: " promotes to " },
		{ piece: "O-O-O", name: "Long castles" },
		{ piece: "O-O", name: "Short castles" },
		{ piece: "  ", name: " " }

	];

	swapList.forEach((item) => {
		ttsText = ttsText.replaceAll(item.piece, item.name);
	});

	return ttsText;
}

function speakNow(speechText) {

	speechText = SAN2SpeechText(speechText);
	//console.log(speechText);

	if ("speechSynthesis" in window) {
		const to_speak = new SpeechSynthesisUtterance(speechText);
		speechSynthesis.cancel();
		speechSynthesis.speak(to_speak);
	}

}

/**
 * Plays a sound
 */
function playRelevantSound(game, sounds = false, speech=false) {
	let soundToPlay = "default"; // Default move sound
	let latestmove = game.history()[game.history().length - 1]; // Last played move
	//console.log(latestmove);

	// Determine if it was the player's move or the computer's (assumes that the board is facing the user, would be flipped if playing opposite side instead)
	if (game.turn() === board.orientation().substring(0, 1).toLowerCase()) {
		soundToPlay = "oppdefault";
	}

	// Check the move against the list to see if it should be something else
	soundlist.forEach((sound) => {
		if (latestmove.includes(sound.movetype)) {
			soundToPlay = sound.movetype;
		}
	});

	// Lookup the required file to play based on the sound type and play it
	if (sounds) {
		let soundfile = soundlist.filter((item) => item.movetype === soundToPlay).map((item) => item);
		soundfile[0].audio.play();
	}

	// Say the move.  This will stop any speech currently being played.
	if (speech){
		speakNow(latestmove);
	}
}

function errorSound(sounds = false) {
	if (sounds) {
		let soundfile = soundlist.filter((item) => item.movetype === "illegal").map((item) => item);
		soundfile[0].audio.play();
	}
}

$(document).ready(function () {
	preloadAudio();
});
