/*
 * Chess-PGN-Trainer
 * https://github.com/rodpolako/Chess-PGN-Trainer
 */

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, document, navigator, window, console,  */
/* global Chessboard */

/* eslint no-unused-vars: "error"*/
/* exported */

// -----------------------
// Define global variables
// -----------------------

// Board & Overall configuration-related variables
let board;
let blankBoard;
let pieceThemePath;
let game;
let config;

// Game & Performance variables
let moveCfg;
let moveHistory;
let puzzleset;
let errorcount;
let error;
let elapsedTimeHHMMSS;
let avgTimeHHMMSS;
let errorRate;
let setcomplete;
let stats;
let puzzlecomplete = false;
let pauseflag = false;
let increment = 0;
let puzzleOrder = [];

// Time-related variables
let pauseStartDateTime;
let pauseEndDateTime;
let startDateTime = new Date();
let pauseDateTimeTotal = 0;

// Promotion variables
let promotionSquare;

// -------------
// Initial Setup
// -------------

// Configuration Imports
import configuration from './config.js';
import PieceList from '../components/piece-list/piece-list-module.js';

// Library Imports
import { Chess } from '../lib/chess/chess1.20.0-esm-customised.js';
/*
	Source: https://github.com/jhlywa/chess.js

	Component download:
	https://cdn.jsdelivr.net/esm/chess.js   // Minified
	https://unpkg.com/chess.js@1.2.0/dist/esm/chess.js  // Original
*/

// See: https://github.com/dexie/Dexie.js
//import { Dexie }  from '../lib/dexie/dexie.min.mjs';

// Component Imports
import { loadPGNFile } from '../components/pgn-handling/pgn-handling-module.js';
import * as lichess from '../components/lichess/lichess-module.js';
import * as sharedTools from '../util/shared-tools-module.js';
import * as annotation from '../components/annotation/annotate-module.js';
import * as audio from '../components/audio/audio-module.js';
import * as dataTools from '../util/datatools-module.js';
import * as colorTools from '../util/color-tools.js';

// Name the app
$('title').text(`${configuration.app.name}`);
$('#title_sidebar').text(`${configuration.app.name}`);
$('#title_topbar').text(`${configuration.app.name}`);

// Version number of the app
$('#versionnumber').text(`${configuration.app.version}`);
$('#versionnumber_sidebar').text(`${configuration.app.version}`);

// -----------------------------------
// Functions for related to appearance
// -----------------------------------

/**
 * Populate the piece selection drop down with the list of pieces
 */
function addPieceSetNames() {
	// Clear any pre-existing values
	$('#piece-select').find('option').remove().end();

	// Populate the dropdown with the available options
	PieceList.forEach((theme) => {
		var newOption = $('<option>');
		newOption.attr('value', theme.DirectoryName).text(theme.Name);
		$('#piece-select').append(newOption);
	});

	// Set the drop down to the saved value
	$('#piece-select').prop('selectedIndex', dataTools.readItem('pieceIndex'));
}

/**
 * Sets the piece theme.  Warning: This will reset the board. Don't use while doing a set.
 */
function changePieces() {
	dataTools.saveItem('pieceIndex', $('#piece-select').prop('selectedIndex'));

	// Load the selected piece theme into a temp object
	var pieceObject;
	pieceObject = PieceList.find((x) => x.DirectoryName === $('#piece-select').val());

	// Build the path to the piece theme using the object properties
	pieceThemePath = configuration.theme.pieceThemePathRoot + pieceObject.DirectoryName + '/{piece}.' + pieceObject.Type;

	// Set the updated board configuration
	setBoardConfig();

	// Update the board with the new pieces
	Chessboard('myBoard', config);

	// Set the colors after the piece change
	changecolor();

	// Reset the game
	resetGame();
}

/**
 * Applies the specified color values (RGB) to the board
 *
 * @param {string} light  The RGB color value for the light squares (such as h1)
 * @param {string} dark   The RGB color value for the dark squares (such as a1)
 */
function setBoardColor(light, dark) {
	$('.white-1e1d7').css({ backgroundColor: light, color: dark });
	$('.black-3c85d').css({ backgroundColor: dark, color: light });
}

/**
 * Sets the values for the board color based on selections via the color picker or manual entry
 * and then applies the values to the board
 */
function changecolor() {
	// Read the values from the color picker inputs
	var light = colorTools.validateHexColor($('#Light-Color').val());
	var dark = colorTools.validateHexColor($('#Dark-Color').val());

	// Set the text in the boxes to match (in case the validation fails and the default grey value is used)
	$('#Light-Color').val(light);
	$('#Dark-Color').val(dark);

	// Update the board colors based on the values
	setBoardColor(light, dark);

	// Set preview boxes to the colors too
	$('#light-color-preview').css('background-color', light);
	$('#dark-color-preview').css('background-color', dark);

	// Save updated values
	dataTools.saveItem('light', light);
	dataTools.saveItem('dark', dark);

	// Calculate the complementary highlight color
	let avgColor = colorTools.mixTwoColors(dataTools.readItem('light'), dataTools.readItem('dark'));
	dataTools.saveItem('movecolor', colorTools.getComplementaryColor(avgColor.hex).hex);
}

/**
 * Toggles the application between dark and light mode.  Saves current setting to file
 */
function toggleDarkMode() {
	let toggled = false;

	configuration.theme.themeProfiles.forEach((theme) => {
		if (document.documentElement.getAttribute('data-bs-theme') !== theme.themeName && !toggled) {
			// Set the theme to whatever the current theme is NOT
			document.documentElement.setAttribute('data-bs-theme', theme.themeName);

			// Save change to settings
			dataTools.saveItem('darkmode', theme.darkmodeSetting);

			// Flip the switch
			$('#chk_darkmode').prop('checked', theme.darkmodeSetting);

			// Set the images
			theme.images.forEach((image) => {
				$('#' + image.ID).attr('src', configuration.theme.themeImgRootPath + theme.themeName + '/' + image.fileName);
			});

			// Set the toggled flag to prevent running this code again in the forEach
			toggled = true;
		}
	});
}

/**
 * Sets the height of the annotation panel when in portrait mode based on remaining visible height after displaying all the other panels
 *
 * @returns
 */
function setCommentAreaAvailableHeight() {
	// If not on a small screen (<576 px wide), set the content area max height to 90% of viewport height
	if (window.innerWidth >= 576) {
		$('#comment_panel').css('max-height', '90vh');
		return;
	}

	// Figure out the remaining available height on a small screen and set the max height to 70% of that

	let availableHeight;
	availableHeight = window.innerHeight - $('#playingarea').innerHeight() - $('#status_area').innerHeight();
	$('#annotation_col').removeClass('d-none');
	$('#annotation_col').addClass('d-block');

	if (availableHeight < 80) {
		availableHeight = 0;

		$('#annotation_col').removeClass('d-block');
		$('#annotation_col').addClass('d-none');
	}

	$('#comment_panel').css('max-height', Math.round(availableHeight) * 0.7);
}

/**
 * Resize both boards to available space
 */
function resizeBoards() {
	board.resize();
	blankBoard.resize();
	changecolor();
	setCommentAreaAvailableHeight();

	// Exit here if there is no puzzle being played
	if (puzzleset.length === 0) {
		return;
	}

	// Annotate if enabled in settings
	annotation.annotateShapes();
	showMove();
	checkKing();
}

/**
 * Update the on-screen board with the current status of the game
 *
 * @param {boolean} animate Set to True to animate the pieces while setting up the position.
 * 							Setting to false sets the pieces instantly.
 */
function updateBoard(animate) {
	board.position(game.fen(), animate);
}

// ------------------------------------
// Settings and configuration functions
// ------------------------------------

/**
 * Initializes the application upon load
 */
function initialize() {
	loadSettings();
	addPieceSetNames();
	changePieces();
	resetGame();
	resizeBoards();
	setCommentAreaAvailableHeight();
}

/**
 * Overwrite all core program settings back to defaults
 */
function writeDefaultSettings() {
	for (const [key, value] of Object.entries(configuration.defaults)) {
		dataTools.saveItem(key, value);
	}
}

/**
 * Sets default values for board color and piece theme
 */
function resetSettings() {
	// Set all the settings to their default values
	writeDefaultSettings();
	initialize();

	// Check to see if dark mode is active currently which is not the default and change back to light mode if that is the case
	if (document.documentElement.getAttribute('data-bs-theme') == 'dark' && dataTools.readItem('darkmode') === 'false') {
		toggleDarkMode();
	}

	// Set the color pickers to the current values
	setColorPickers();
}

/**
 * Load the settings for the application.  Sets defaults if values are not found
 */
function loadSettings() {
	// Load defaults if any keys are missing (ex: running for the first time)
	for (const [key, value] of Object.entries(configuration.defaults)) {
		if (dataTools.readItem(key) == null || dataTools.readItem(key) == '') {
			dataTools.saveItem(key, value);
		}
	}

	// Load slider settings
	configuration.collection.sliderList.forEach((setting) => {
		$(setting.fieldName).val(dataTools.readItem(setting.settingname));
	});

	// Load settings to the switches
	configuration.collection.switchlist.forEach((setting) => {
		// First uncheck the control (default)
		$(setting.switchname).prop('checked', false);

		// Turn the control on if specified
		if (sharedTools.isSettingEnabled(setting.settingname)) {
			$(setting.switchname).prop('checked', true);
		}
	});

	// Load settings to the text input fields
	configuration.collection.fieldList.forEach((setting) => {
		$(setting.fieldName).val(dataTools.readItem(setting.settingname));
	});

	// Toggle dark mode if previously set
	if (sharedTools.isSettingEnabled('darkmode')) {
		toggleDarkMode();
	}
}

/**
 * Set the program options based on the presence of PGNTrainer tags
 */
function setStartupOptions() {
	// First clear all PGNTag checkboxes
	configuration.collection.PGNTagList.forEach((setting) => {
		$(setting.switchname).prop('checked', false);
	});

	// Set the options checkboxes if any of the special tags at the top of the PGN have a value of 1
	// Load settings to the switches
	configuration.collection.PGNTagList.forEach((setting) => {
		if (puzzleset[0].tags[setting.PGNTagName] === '1') {
			$(setting.switchname).prop('checked', true);
		}
		if (puzzleset[0].gameComment !== null) {
			if (puzzleset[0].gameComment[setting.PGNTagName] === '1') {
				$(setting.switchname).prop('checked', true);
			}
		}
	});

	// Make sure that both "Play both sides" and "Play opposite side" are not selected (if yes, clear both)
	confirmOnlyOneOption();
}

/**
 * Save the state of all the switches
 */
function saveTextEntries() {
	configuration.collection.fieldList.forEach((setting) => {
		dataTools.saveItem(setting.settingname, $(setting.fieldName).val());
	});
}

/**
 * Save the state of all the sliders
 */
function adjustspeedslider() {
	configuration.collection.sliderList.forEach((setting) => {
		dataTools.saveItem(setting.settingname, $(setting.fieldName).val());
	});

	// Reset the game
	resetGame();
}

/**
 * Show the settings modal
 */
function setColorPickers() {
	if ($('#Light-Color').val().length == 7) {
		//var light = $('#Light-Color').val();
		var light = colorTools.validateHexColor($('#Light-Color').val());
		$('#Light-Color').minicolors('value', light);
	}

	if ($('#Dark-Color').val().length == 7) {
		var dark = $('#Dark-Color').val();
		$('#Dark-Color').minicolors('value', dark);
	}
}

/**
 * Ensure that the options selectable are correct for the given situation
 *
 * Since it is non-sensical to have both selected, only allow either "Play both sides" or "Play opposite side"
 * to be checked but not both.
 */
function confirmOnlyOneOption() {
	// Clear both options if somehow both options get checked (ex: both options enabled via PGN tag)
	if ($('#playoppositeside').is(':checked') && $('#playbothsides').is(':checked')) {
		$('#playbothsides').prop('checked', false);
		$('#playoppositeside').prop('checked', false);
		$('#playbothsides').prop('disabled', false);
		$('#playoppositeside').prop('disabled', false);
	}

	// Enable both options as long as neither option is already checked
	if (!$('#playoppositeside').is(':checked') && !$('#playbothsides').is(':checked')) {
		$('#playbothsides').prop('disabled', false);
		$('#playoppositeside').prop('disabled', false);
	}

	// Disable "Play opposite side" since "Play both sides" is checked
	if ($('#playbothsides').is(':checked')) {
		$('#playoppositeside').prop('disabled', true);
	}

	// Disable "Play both sides" since "Play opposite side" is checked
	if ($('#playoppositeside').is(':checked')) {
		$('#playbothsides').prop('disabled', true);
	}
}

/**
 * Flip the board if "Play opposite side" is checked as the default
 *
 * Normal usage of "Play Opposite side" involves playing from the other side of the board.  Thus, if this option is
 * selected, then also turn on "Flipped".
 */
function setFlipped() {
	// If playoppositeside is checked, also turn on flipped
	if ($('#playoppositeside').is(':checked')) {
		$('#flipped').prop('checked', true);
	}
}

// ------------------
// Gameplay functions
// ------------------

/**
 * Manually advance to next puzzle (used for the Next button)
 */
function goToNextPuzzle() {
	//console.log('increment', increment);
	// Check to see if the current puzzle is complete
	if (game.history().length === moveHistory.length) {
		puzzlecomplete = true;
	}

	//console.log('puzzlecomplete', puzzlecomplete);
	// Check to see if the set is completeinitalize

	//console.log('puzzleset.length', puzzleset.length);
	if (increment + 1 === puzzleset.length) {
		setcomplete = true;
	}

	//console.log('setcomplete', setcomplete);
	// Are there more puzzles to go?  If yes, load the next one in the sequence
	if (increment < puzzleset.length - 1) {
		increment += 1;
	}

	// Stop once all the puzzles in the set are done
	if (setcomplete && puzzlecomplete) {
		gameOver();
		return;
	}

	// Load the next puzzle
	loadPuzzle(puzzleset[puzzleOrder[increment]]);
	dataTools.saveItem('puzzleIndex', increment);
}

/**
 * End-of-game procedure (stats, buttons, etc.)
 */
function gameOver() {
	// Clear the move indicator
	indicateMove(true);

	// Hide & disable the "Start" and "Pause" buttons
	sharedTools.setDisplayAndDisabled(['#btn_starttest', '#btn_pause', '#btn_next'], 'none', true);

	// Show "Restart" button
	sharedTools.setDisplayAndDisabled(['#btn_restart'], 'inline-block', false);

	// Show the stats
	generateStats();
	showStats();
}

/**
 * Compare latest played move to the move in the same position as the PGN
 *
 * @returns
 */
async function checkAndPlayNext(target) {
	let gameMoveIndex = game.history().length - 1;

	// Guard condition if wrong move played (return early)
	if (game.history()[gameMoveIndex] !== moveHistory[gameMoveIndex]) {
		// wrong move

		if (error === false) {
			// Add one to the error count for any given puzzle
			errorcount += 1;
		}
		error = true;

		// Flash the square in red to indicate an error
		annotation.markError(target);

		// Play the error sound
		audio.errorSound(sharedTools.isSettingEnabled('playAudio'));

		// Undo that move from the game
		game.undo();

		// Snap the bad piece back
		return 'snapback';
	}

	// Correct move was played

	// Post-move functions
	moveMade();

	// play next move automatically if the "Play both sides" box is unchecked and there are still moves to play
	if (!$('#playbothsides').is(':checked')) {
		if (game.history().length !== moveHistory.length) {
			// Play the opponent's next move from the PGN
			game.move(moveHistory[game.history().length]);

			// Post-move functions
			moveMade();
		}
	}

	// Indicate the color to move
	indicateMove();

	// Check if all the expected moves have been played
	if (game.history().length === moveHistory.length) {
		puzzlecomplete = true;

		// Turn on the next button
		$('#btn_next').prop('disabled', false);

		// Clear the move turn indicator
		indicateMove(true);

		// Check to see if this is the last puzzle
		if (increment + 1 === puzzleset.length) {
			setcomplete = true;
		}

		// Are there more puzzles to go?  If yes, load the next one in the sequence
		if (increment < puzzleset.length - 1) {
			// Auto advance to the next puzzle if the "Next Button" option is not selected
			if (!$('#manualadvance').is(':checked')) {
				increment += 1;
				loadPuzzle(puzzleset[puzzleOrder[increment]]);
				dataTools.saveItem('puzzleIndex', increment);
			}
		}
	}

	// Stop once all the puzzles in the set are done
	if (setcomplete && puzzlecomplete) {
		//console.log('Puzzle and set complete, game over');
		gameOver();
	}
}

/**
 * Clear all the on-screen messages
 */
function clearMessages() {
	for (var messageelement of configuration.collection.messagelist) {
		$(messageelement).text('');
	}
}

/**
 * Indicate who's turn it is to move
 */
function indicateMove(nullMove = false) {
	$('#moveturn').text('White to move');

	if (game.turn() === 'b') {
		$('#moveturn').text('Black to move');
	}

	// By default the move is not null
	// In case it is (ie: true was passed as an argument)
	// Clear the move indicator
	if (nullMove) {
		$('#moveturn').text('');
	}
}

/**
 * Handle when a user presses the "pause" button
 */
function pauseGame() {
	// Start a new counter (to then subtract from overall total)
	//$(window).trigger('resize');
	switch (pauseflag) {
		case false:
			$('#btn_pause').text('Resume');

			pauseflag = true;
			pauseStartDateTime = new Date();

			// hide the board
			$('#myBoard').css('display', 'none');
			$('#blankBoard').css('display', 'block');

			// Remove focus on the pause/resume button
			$('#btn_pause').blur();

			// Disable the Hint, Reset, Next and Open PGN buttons while paused
			$('#btn_reset').prop('disabled', true);
			$('#openPGN_button').prop('disabled', true);
			$('#btn_hint').prop('disabled', true);
			$('#btn_library').prop('disabled', true);
			$('#analysis_link').addClass('disabled');

			break;

		case true:
			$('#btn_pause').text('Pause');

			pauseflag = false;
			pauseEndDateTime = new Date();

			// Keep running total of paused time
			pauseDateTimeTotal += pauseEndDateTime - pauseStartDateTime;

			// show the board
			$('#myBoard').css('display', 'block');
			$('#blankBoard').css('display', 'none');

			// Remove focus on the pause/resume button
			$('#btn_pause').blur();

			// Re-enable the Hint, Reset and Open PGN buttons
			$('#btn_reset').prop('disabled', false);
			$('#openPGN_button').prop('disabled', false);
			$('#btn_hint').prop('disabled', false);
			$('#btn_library').prop('disabled', false);
			$('#analysis_link').removeClass('disabled');

			break;
	}

	$(window).trigger('resize');
	changecolor();
}

/**
 * Set the configuration for the board prior to creating/re-creating the board(s)
 */
function setBoardConfig() {
	if (dataTools.readItem('speed') == null || dataTools.readItem('speed') == '') {
		dataTools.saveItem('speed', 200);
	}

	if (pieceThemePath === undefined) {
		pieceThemePath = configuration.theme.pieceThemePath;
	}

	// Initial Board Configuration
	config = {
		draggable: true,
		pieceTheme: pieceThemePath,
		onDragStart: dragStart,
		onDrop: dropPiece,
		onSnapEnd: snapEnd,
		moveSpeed: parseInt(dataTools.readItem('speed')),
		position: 'start',
	};
}

/**
 * Default button configuration at start of a session
 */
function initialButtonSetup() {
	// Show Start button and hide "Pause" and "Restart" buttons
	sharedTools.setDisplayAndDisabled(['#btn_starttest'], 'inline-block', true);
	sharedTools.setDisplayAndDisabled(['#btn_pause', '#btn_restart', '#btn_next'], 'none', true);

	// Hide & disable the "Hint" and the "Show Results" buttons
	sharedTools.setDisplayAndDisabled(['#btn_hint', '#btn_showresults'], 'none', true);
}

/**
 * Reset everything in order to start a new testing session
 */
function resetGame() {
	// Reset the current game in memory
	board = null;
	blankBoard = null;
	game = new Chess();
	moveHistory = [];
	puzzleset = [];
	errorcount = 0;
	pauseDateTimeTotal = 0;
	error = false;
	setcomplete = false;

	puzzlecomplete = false;
	pauseflag = false;
	increment = 0;
	puzzleOrder = [];

	// Create the boards
	setBoardConfig();
	board = new Chessboard('myBoard', config);
	blankBoard = new Chessboard('blankBoard', { showNotation: false });

	// chessboardjs-specific additions and stylings to center the board in bootstrap
	$('.board-b72b1').addClass('container p-0');
	$('.board-b72b1').css({
		border: '0px',
		'margin-left': 'auto',
		'margin-right': 'auto',
	});
	$('.chessboard-63f37').css('position', 'relative');

	// Set the counters back to zero
	$('#puzzleNumber').text('0');
	$('#puzzleNumbertotal').text('0');

	initialButtonSetup();

	// Show the full board (in case the reset happened during a pause)
	$('#myBoard').css('display', 'block');
	$('#blankBoard').css('display', 'none');
	$('#blankBoard').addClass('pausedBoard');

	// Reset the progress bar
	$('#progressbar').width('0%');
	$('#progressbar').text('0%');

	// Disable options checkboxes
	sharedTools.setCheckboxSelectability(false);

	// Clear the checkboxes
	configuration.collection.PGNTagList.forEach((setting) => {
		$(setting.switchname).prop('checked', false);
	});

	// Remove focus on the reset button
	$('#btn_reset').blur();

	// Clear any prior results/statistics
	clearMessages();

	// Clear the file value in the Open PGN control (to prepare for the next file)
	$('#openPGN').val('');

	// Clear the analysis link
	$('#analysisDiv').empty();

	// Disable the analysis link button
	$('#analysis_link').addClass('disabled');

	// Set the Analysis Link button to grey
	$('#img_anaylsis').attr('src', configuration.theme.themeImgRootPath + 'magnifier-grey.png');

	// Clear the move indicator
	indicateMove(true);

	// Close the sidebar
	$('#close_sidebar').click();

	changecolor();

	// Clear the content title and window
	$('#comment_event_name').prop('innerHTML', '');
	$('#comment_annotation').prop('innerHTML', '');
	//console.clear();

	// Clear any prior coloring
	$('.movedpiece').remove();
}

/**
 * Show the hint
 */
function showHint() {
	// Change the text of the button to the correct move
	$('#btn_hint').text(moveHistory[game.history().length]);

	// Set error flag for this puzzle since hint was used.
	if (error === false) {
		errorcount += 1;
	}
	error = true;
}

/**
 * Show the results modal
 */
function showresults() {
	$('#resmodal').modal('show');
}

/**
 * Starts the test and timer
 */
function startTest() {
	//console.clear();

	// Check to make sure that a PGN File was loaded
	if (puzzleset.length === 0) {
		return;
	}

	initialButtonSetup();

	// Hide "Start", "Restart" & "Show Results" buttons
	sharedTools.setDisplayAndDisabled(['#btn_starttest', '#btn_restart', '#btn_showresults'], 'none');

	// Show & enable the "Hint" and "Pause" buttons
	sharedTools.setDisplayAndDisabled(['#btn_pause', '#btn_hint'], 'inline-block', false);

	// Only turn on the next button if the option is selected (at the start it is disabled)
	if ($('#manualadvance').is(':checked')) {
		sharedTools.setDisplayAndDisabled(['#btn_next'], 'inline-block', true);
	}

	// Disable changing options
	sharedTools.setCheckboxSelectability(false);

	// Clear any messages
	clearMessages();

	// Clear any annotations
	annotation.deleteAllShapeAnnotations();

	// Clear the analysis link
	$('#analysisDiv').empty();

	// Activate the speech synthesis (in case it is needed)
	audio.speakNow('');

	// Load first puzzle and start counting for errors (for now...)
	errorcount = 0;

	// Get current date/time
	startDateTime = new Date();
	pauseDateTimeTotal = 0;
	increment = 0;
	setcomplete = false;

	// Clear the move turn indicator
	indicateMove(true);

	// Neat bit here from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
	const arrayRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

	// Generate numbers between 0 and the number of puzzles (minus 1) in the PGN in order
	puzzleOrder = arrayRange(0, puzzleset.length - 1, 1);

	// Shuffle the set if the box is checked
	if ($('#randomizeSet').is(':checked')) {
		// Generate numbers between 0 and the number of puzzles (minus 1) in the PGN and then shuffle them
		puzzleOrder = sharedTools.shuffle(arrayRange(0, puzzleset.length - 1, 1));
	}

	// save puzzle order to local storage (to add feature to resume if browser closes)
	dataTools.saveItem('puzzleOrder', puzzleOrder);

	// Now just need to send the desired puzzle to the board.
	loadPuzzle(puzzleset[puzzleOrder[increment]]);
	dataTools.saveItem('puzzleIndex', increment);
}

/**
 * Updates the progress bar on the screen
 *
 * @param {int} partial_value  The number of completed puzzles (numerator)
 * @param {int} total_value    The total number of puzzles (denominator)
 */
function updateProgressBar(partial_value, total_value) {
	// Do the math
	const progress = Math.round((partial_value / total_value) * 100);

	// Show the result
	let progresspercent = progress + '%';
	$('#progressbar').width(progresspercent);
	$('#progressbar').text(progresspercent);
}

/**
 * Create a link of the current position to lichess analysis board
 */
function updateAnalysisLink() {
	if (game.fen()) {
		var lichessURL = 'https://lichess.org/analysis/' + game.fen().replace(/ /g, '_');
	}

	if (lichessURL) {
		// Enable the button
		$('#analysis_link').removeClass('disabled');

		// Set the image to contrast the theme (light or dark)
		$('#img_anaylsis').attr('src', configuration.theme.themeImgRootPath + 'light/magnifier-black.png');
		if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
			$('#img_anaylsis').attr('src', configuration.theme.themeImgRootPath + 'dark/magnifier-white.png');
		}

		// Update the link from the magnifying glass
		$('#analysis_link').attr('href', lichessURL);
	}
}

/**
 * Check the status of the current player's king to determine if it is in Check or Checkmate
 */
function checkKing() {
	// Remove any existing markings
	$('.threat').remove();

	// Check to see if the game in currently in check or checkmate (Works for both) and if so, highlight the king under attack
	if (game.inCheck()) {
		let threatenedKing = game.findPiece({ type: 'k', color: game.turn() })[0];
		annotation.KingCheckorMate(threatenedKing);
	}
}

/**
 * Show the beginning and ending squares of the last played move
 */
function showMove() {
	// Highlight from and to squares
	if ([game.history().length - 1] >= 0) {
		let fromSquare = game.history({ verbose: true })[game.history().length - 1].from;
		let toSquare = game.history({ verbose: true })[game.history().length - 1].to;
		annotation.markMovedSquare(fromSquare, toSquare);
	}
}

/**
 * Common functions required after making a move
 */
async function moveMade() {
	// Output any comment after this move
	annotation.annotate();

	// Update the analysis link
	updateAnalysisLink();

	// Check on the status of the King for check or checkmate
	checkKing();

	// Get the SAN of the last played move
	let latestmove = game.history()[game.history().length - 1]; // Last played move

	// Determine if it was the player's move or the computer's (assumes that the board is facing the user, would be flipped if playing opposite side instead)
	let selfmove = true;
	if (game.turn() === board.orientation().substring(0, 1).toLowerCase()) {
		selfmove = false;
	}

	// Play the appropriate sound effect
	await audio.playRelevantSound(latestmove, selfmove, sharedTools.isSettingEnabled('playAudio'), sharedTools.isSettingEnabled('playSpeech'));
	//await wait (100)

	showMove();
}

/**
 * Attempt to add the chosen move to the current game
 *
 * @param {Chess} game The current chess.js object
 * @param {object} cfg The configuration of the current move (from, to, promotion)
 * @returns {string}
 */
function makeMove(game, cfg) {
	// See if the move is legal
	try {
		game.move(cfg);
	} catch (error) {
		// Reject invalid moves
		return 'snapback';
	}
}

/**
 * Load the desired puzzle or position from the PGN to the screen
 *
 * @param {object} PGNPuzzle The object representing a specific position and move sequence
 */
function loadPuzzle(PGNPuzzle) {
	//console.log(PGNPuzzle);
	let moveindex = 0;
	let nullMove = false;

	// Clear the content title and window
	$('#comment_event_name').prop('innerHTML', '');
	$('#comment_annotation').prop('innerHTML', '');
	$('#analysisDiv').empty();

	// Clear any current drawings on the board
	annotation.deleteAllShapeAnnotations();

	// Update the screen with the value of the PGN Event tag (if any)
	//$('#puzzlename').html(PGNPuzzle.tags.Event);
	$('#comment_event_name').append(PGNPuzzle.tags.Event);

	// Display current puzzle number in the sequence
	$('#puzzleNumber').text(increment + 1);

	updateProgressBar(increment, puzzleset.length);

	// Turn off the next button at the start
	$('#btn_next').prop('disabled', true);

	// Set the error flag to false for this puzzle (ie: only count 1 error per puzzle)
	error = false;
	puzzlecomplete = false;

	// Clear any markings of previous moves
	$('.movedpiece').remove();

	// Load the board position into memory
	try {
		game = new Chess(PGNPuzzle.tags.FEN);
	} catch (error) {
		// Exception handling in case of an invalid FEN, output the error to the console but try to continue
		console.log(error.message);
		game = new Chess(PGNPuzzle.tags.FEN, { skipValidation: true });
		board.position(PGNPuzzle.tags.FEN);
	}

	// Load the moves of the PGN into memory
	PGNPuzzle.moves.forEach((move) => {
		// Check to make sure the move to make is not a null move
		if (move.notation.notation !== 'Z0') {
			game.move(move.notation.notation);
		}
	});

	// Enable the next button if there are no moves to play at all or if the first move is also a null move, regardless of the Next button setting
	if (PGNPuzzle.moves.length == 0 || (PGNPuzzle.moves.length == 1 && PGNPuzzle.moves[0].notation.notation === 'Z0')) {
		sharedTools.setDisplayAndDisabled(['#btn_next'], 'inline-block', false);
		// Clear the move turn indicator (since it is nobody's move)
		nullMove = true;
		indicateMove(nullMove);
	}

	// Copy the move order from the PGN into memory
	moveHistory = game.history();

	// Use this information to initialize the annotation components.
	// Clear any current drawings on the board
	annotation.initializeAnnotation(game, PGNPuzzle, moveHistory);

	// Set the board position to the opening in the puzzle (ie: undo all steps in the PGN)
	while (game.undo() !== null) {
		game.undo();
	}

	// Clear the board
	board.clear();

	// Set the board orientation based on game.turn()
	let boardOrientation = game.turn();

	// Check for presense of MoveColor tag and if available use that instead
	if (typeof PGNPuzzle.tags.MoveColor !== 'undefined') {
		boardOrientation = PGNPuzzle.tags.MoveColor;
	}

	// Check for presense of MoveColor tag as an embedded command and if available use that instead
	// TODO confirm this way of checking for null is safe
	if (PGNPuzzle.gameComment?.MoveColor) {
		boardOrientation = PGNPuzzle.gameComment.MoveColor;
	}

	// Get the current status of the board.  Use it to determine if the board needs to be flipped based on the puzzle.
	let currentBoardOrientation = board.orientation().substring(0, 1).toLowerCase();

	// Now that orientation is determined, flip the board if the current orientation does not match the determined one
	if (boardOrientation != currentBoardOrientation) {
		board.flip();
	}

	// Set the board to the beginning position of the puzzle
	updateBoard(false);

	$('#comment_annotation').append('<br>');

	// If there is commentary before the first move, show it in the annotation panel
	if (PGNPuzzle.gameComment?.comment) {
		$('#comment_annotation').prop('innerHTML', annotation.stripNewLine(PGNPuzzle.gameComment.comment));
		$('#comment_annotation').append('<br><br>');

		// Scroll to the bottom of the content
		$('#comment_panel').scrollTop($('#comment_panel').prop('scrollHeight'));

		// Draw any shapes if present
		annotation.annotateShapes();
	}

	// Check on the status of the King for check or checkmate
	checkKing();

	// Check to see if the computer needs to play the first move due to the conflict between the FEN and the MoveColor tag (unless player is playing both sides)
	if (
		((PGNPuzzle.tags.MoveColor != game.turn() && typeof PGNPuzzle.tags.MoveColor !== 'undefined') ||
			(PGNPuzzle.gameComment?.MoveColor != game.turn() && typeof PGNPuzzle.gameComment?.MoveColor !== 'undefined')) &&
		!$('#playbothsides').is(':checked')
	) {
		// There is a discrepency, make the first move
		game.move(moveHistory[moveindex]);

		// Set the board to the next position of the puzzle
		updateBoard(true);

		// Post-move functions
		moveMade();

		// Update the index so that if play opposite side is used it plays the NEXT move
		moveindex = 1;
	}

	// Flip board if "Flipped" checkbox is checked
	if ($('#flipped').is(':checked')) {
		board.flip();
	}

	// Play the first move if player is playing second and not both sides
	if ($('#playoppositeside').is(':checked') && !$('#playbothsides').is(':checked')) {
		// Make the move if there are moves to make
		if (moveHistory.length > 0) {
			game.move(moveHistory[moveindex]);
		}

		// Set the board to the next position of the puzzle
		updateBoard(true);

		// Post-move functions
		moveMade();
	}

	// Update the status of the game in memory with the new data
	indicateMove(nullMove);

	changecolor();

	// Update the analysis link
	updateAnalysisLink();
}

// ------------------------
// Pawn Promotion functions
// ------------------------

/**
 * Get an individual piece image based on the color of the current player
 *
 * @param {chess} piece A chess piece
 * @returns {*}
 */
function getImgSrc(piece) {
	return configuration.theme.pieceThemePath.replace('{piece}', game.turn() + piece.toLocaleUpperCase());
}

/**
 * Populate the pawn promotion modal
 */
function getPieces() {
	let piecelist = ['q', 'r', 'n', 'b'];

	piecelist.forEach((piece) => {
		$('#' + piece).attr('src', getImgSrc(piece));
	});
}

/**
 * Set the promotion value in the move config and make the move
 *
 * @param {button} button The button that called the function
 */
function onPromotionDialogClose(button) {
	moveCfg.promotion = button[0].id;
	makeMove(game, moveCfg);
	checkAndPlayNext(promotionSquare);
	updateBoard(true);
}

// -----------------------
// Chessboard JS functions
// -----------------------

/**
 * Handle the start of moving a piece on the board
 *
 * @param {*} source       The source square from where the piece started
 * @param {*} piece        A chess.js game piece
 * @param {*} position     The position of the board
 * @param {*} orientation  The board orientation
 * @returns {boolean}
 */
function dragStart(source, piece) {
	// Only pick up pieces for the side to move
	if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	}

	// Don't allow moves if game is paused
	if (pauseflag) {
		return false;
	}

	// Do not pick up pieces if the puzzle is complete (ie: all the moves of the PGN have been played)
	if (game.history().length === moveHistory.length) {
		return false;
	}

	// Get list of available moves from this square?
	const legalMoves = game.moves({
		square: source,
		verbose: true,
	});

	// Draw dots on the possible target squares (if enabled)
	if (sharedTools.isSettingEnabled('legalmoves')) {
		legalMoves.forEach((move) => {
			// Look for presence of 'x' in move.san to indicate capture and add different class
			if (move.san.indexOf('x') > -1) {
				annotation.drawDot(move.to, true);
			} else {
				annotation.drawDot(move.to, false);
			}
		});
	}

	// Clear last error element
	$('.error').remove();
}

/**
 * Handle the end of moving a piece on the board
 *
 * @param {*} source The source square from where the piece started
 * @param {*} target The target square to where the piece ended
 * @returns {string}
 */
function dropPiece(source, target) {
	// remove all legal move dots from the board
	annotation.clearAllDots();

	// is it a promotion?
	const source_rank = source.substring(2, 1);
	const target_rank = target.substring(2, 1);
	const piece = game.get(source).type;

	// First attempt at move
	// see if the move is legal
	moveCfg = {
		from: source,
		promotion: 'q',
		to: target,
	};

	if (makeMove(game, moveCfg) === 'snapback') {
		return 'snapback'; // Not a legal move (including dropping it where you started).  Go back.
	}

	game.undo(); // move is ok, now we can go ahead and check for promotion

	// Check is this is a promotion
	if (piece === 'p' && ((source_rank === '7' && target_rank === '8') || (source_rank === '2' && target_rank === '1'))) {
		// Define the target square for move evaluation
		promotionSquare = target;

		// Get the correct color pieces for the promotion popup
		getPieces();

		// Show the select piece promotion dialog screen
		$('#pawnPromotion').modal('show');

		return;
	}

	// Not a promotion, go ahead and move
	makeMove(game, moveCfg);

	// Check if the move played is the expected one and play the next one if it was
	(async () => {
		await checkAndPlayNext(target);
	})();
	//checkAndPlayNext(target);

	// Check on the status of the King for check or checkmate
	checkKing();

	// Clear the move indicator if everything is done
	if (setcomplete || puzzlecomplete) {
		indicateMove(true);
	}

	// Clear the hint if used
	$('#btn_hint').text('Hint');
}

/**
 * Update the board position after the piece snap for castling, en passant, pawn promotion
 */
function snapEnd() {
	// Update instantly if the puzzle is done
	if (puzzlecomplete) {
		updateBoard(false);
		return;
	}
	updateBoard(true);
}

// -------------------------
// Results related functions
// -------------------------

/**
 * Test for access to the clipboard
 *
 * @returns {boolean} Returns true if access to the clipboard is available
 */
function testClipboard() {
	try {
		navigator.clipboard.writeText('Test');
	} catch (err) {
		// Cannot write to the clipboard
		console.log(err);

		// Turn off the setting
		$('#chk_clipboard').prop('checked', false);

		// Disable the copy to clipboard button on the results modal
		$('#copyToClipboard').prop('disabled', true);

		// Update the setting save to turn this off
		dataTools.saveItem('copy2clipboard', false);

		return false;
	}

	// Since we can copy to the clipboard, go ahead and allow the toggle change
	sharedTools.toggleSetting('#chk_clipboard', 'copy2clipboard');

	return true;
}

/**
 * Output the stats to the clipboard
 */
function outputStats2Clipboard() {
	// Copy Tab-delimited version to clipboard for easy pasting to spreadsheets

	if (testClipboard()) {
		let csvHeader = '';

		// add the header row if option is selected
		if (sharedTools.isSettingEnabled('csvheaders')) {
			csvHeader = Object.keys(stats).join('\t') + '\n';
		}

		navigator.clipboard.writeText(csvHeader + Object.values(stats).join('\t'));
	}
}

/**
 * Output the stats to a csv file
 */
function outputStats2CSV() {
	// Adapted from https://stackoverflow.com/questions/61339206/how-to-export-data-to-csv-using-javascript
	let csvHeader = '';
	let csvBody = Object.values(stats).join(',') + '\n';
	let datetimestamp = new Date()
		.toISOString()
		.replace(/[^0-9]/g, '')
		.slice(0, -3);
	var hiddenElement = document.createElement('a');

	// add the header row if option is selected
	if (sharedTools.isSettingEnabled('csvheaders')) {
		csvHeader = Object.keys(stats).join(',') + '\n';
	}

	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvHeader + csvBody);
	hiddenElement.target = '_blank';
	hiddenElement.download = datetimestamp + '.csv';
	hiddenElement.click();
}

/**
 * Generate the statistics for this run
 */
function generateStats() {
	// Compute the time and error values
	const currentDate = new Date().toJSON().slice(0, 10);
	const endDateTime = new Date();
	const ElapsedTimeSeconds = (endDateTime - startDateTime - pauseDateTimeTotal) / 1000; // Subtracting the paused time from total elapsed time
	elapsedTimeHHMMSS = new Date(ElapsedTimeSeconds * 1000).toISOString().slice(11, 19);
	const AvgTimeSeconds = Math.round(ElapsedTimeSeconds / puzzleset.length);
	avgTimeHHMMSS = new Date(AvgTimeSeconds * 1000).toISOString().slice(11, 19);
	errorRate = errorcount / puzzleset.length;

	// Get the filename of the PGN file
	// Adapted from https://stackoverflow.com/questions/857618/javascript-how-to-extract-filename-from-a-file-input-control
	var fullPath = $('#openPGN').val();
	var startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
	var filename = fullPath.substring(startIndex);

	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
		filename = filename.substring(1);
	}

	filename = filename.substring(0, filename.lastIndexOf('.'));

	// Get the mode (random or sequential)
	var mode = 'Sequential';
	if ($('#randomizeSet').is(':checked')) {
		mode = 'Random';
	}

	// Build the stats object
	stats = {};

	stats.date = currentDate;
	stats.filename = filename;
	stats.round = '';
	stats.series = puzzleset[0].Series;
	stats.mode = mode;
	stats.setlength = puzzleset.length;
	stats.errors = errorcount;
	stats.totaltime = elapsedTimeHHMMSS;
	stats.avgtime = avgTimeHHMMSS;
	stats.errorrate = errorRate;
}

/**
 * Show the final stats after finishing all the puzzles in the set
 */
function showStats() {
	// Format the error rate to 1 decimal place
	const errorRate1Dec = stats.errorrate.toFixed(3) * 100;

	// Show 100% on the progress bar
	updateProgressBar(1, 1);

	// Show & enable "Show Results" button
	sharedTools.setDisplayAndDisabled(['#btn_showresults'], 'inline-block', false);

	// Hide & disable the "hint" button
	sharedTools.setDisplayAndDisabled(['#btn_hint'], 'none', true);

	// Update the results modal with the details
	$('#elapsedTime').text(`Elapsed time (hh:mm:ss): ${stats.totaltime}`);
	$('#avgTime').text(`Average time/puzzle (hh:mm:ss): ${stats.avgtime}`);
	$('#errors').text(`Number of errors: ${stats.errors}`);
	$('#errorRate').text(`Error Rate: ${errorRate1Dec.toFixed(1)}%`);

	// Display the modal
	showresults();

	// Copy results to clipboard for pasting into spreadsheet
	if ($('#chk_clipboard').is(':checked')) {
		outputStats2Clipboard();
	}

	// Re-enable options checkboxes
	sharedTools.setCheckboxSelectability(true);
	confirmOnlyOneOption();
}

// ---------------------
// PGN-related functions
// ---------------------

/**
 * Process the PGN file that has been loaded
 *
 * @param {text} PGNDataFile The text representation of the PGN data
 * @returns
 */
function postPGNReadSetup(PGNDataFile) {
	//console.log(PGNDataFile);
	puzzleset = loadPGNFile(PGNDataFile);
	//console.log(puzzleset);

	if (puzzleset.length > 0) {
		// File is now loaded
		// Update the range of the puzzle counters to the size of the puzzleset
		$('#puzzleNumber').text('1');
		$('#puzzleNumbertotal').text(puzzleset.length);

		// Set any startup options found in the PGN
		setStartupOptions();

		initialButtonSetup();

		// Enable the start button
		sharedTools.setDisplayAndDisabled(['#btn_starttest'], 'inline-block', false);

		// Now that file is loaded, enable the ability to select options
		sharedTools.setCheckboxSelectability(true);
		confirmOnlyOneOption();

		// Clear the file value in the Open PGN control (to prepare for the next file)
		$('#openPGN').val('');

		// Close the sidebar
		$('#close_sidebar').click();

		return;
	}

	resetGame();
}

/**
 * Read the file selected in the file picker
 *
 * @param {*} filedata The contents of the file picker selection
 */
function readFile(filedata) {
	var file = filedata.files[0];
	var fileReader = new window.FileReader();

	fileReader.readAsText(file);
	fileReader.onload = function (data) {
		resetGame();
		postPGNReadSetup(data.target.result);
	};
}

// -------------------------
// Lichess studies functions
// -------------------------

/**
 * Connect to Lichess and populate the studies list
 */
async function loadLichessData() {
	await lichess.accessLichessAPI();
}

// ------------------
// Button assignments
// ------------------

/**
 * Assign actions to the buttons and other controls
 * Buttons, switches, etc.
 */
$(() => {
	$('#openPGN_button').on('click', function () {
		$('#openPGN').click();
	});

	$('#openPGN').on('change', function () {
		readFile(this);
	});

	$('#btn_reset').on('click', function () {
		resetGame();
	});

	$('#btn_showresults').on('click', function () {
		showresults();
	});

	$('#btn_hint').on('click', function () {
		showHint();
	});

	$('#btn_starttest').on('click', function () {
		startTest();
	});

	$('#btn_restart').on('click', function () {
		startTest();
	});

	$('#chk_clipboard').on('click', function () {
		testClipboard();
	});

	$('#playbothsides').on('change', function () {
		confirmOnlyOneOption();
	});

	$('#piece-select').on('change', function () {
		changePieces();
	});

	$('#btn_defaults').on('click', function () {
		resetSettings();
	});

	$('#chk_darkmode').on('click', function () {
		toggleDarkMode();
	});

	$('#chk_csvheaders').on('change', function () {
		sharedTools.toggleSetting('#chk_csvheaders', 'csvheaders');
	});

	$('#chk_legalMoves').on('change', function () {
		sharedTools.toggleSetting('#chk_legalMoves', 'legalmoves');
	});

	$('#chk_circlesarrows').on('change', function () {
		sharedTools.toggleSetting('#chk_circlesarrows', 'circlesarrows');
	});

	$('#chk_playAudio').on('change', function () {
		sharedTools.toggleSetting('#chk_playAudio', 'playAudio');

		if ($('#chk_playAudio').is(':checked')) {
			audio.preloadAudio();
		}
	});

	$('#chk_playSpeech').on('change', function () {
		sharedTools.toggleSetting('#chk_playSpeech', 'playSpeech');
	});

	$('#copyToClipboard').on('click', function () {
		outputStats2Clipboard();
	});

	$('#downloadToCSV').on('click', function () {
		outputStats2CSV();
	});

	$('#btn_pause').on('click', function () {
		pauseGame();
	});

	$('#btn_Settings').on('click', function () {
		setColorPickers();
	});

	$('#btn_SettingsSidebar').on('click', function () {
		setColorPickers();
	});

	$('#btn_next').on('click', function () {
		goToNextPuzzle();
	});

	$('.promo-button').on('click', function () {
		onPromotionDialogClose($(this));
	});

	$('#pieceSpeed').on('change', function () {
		adjustspeedslider();
	});

	$('.settingstextinput').on('change', function () {
		saveTextEntries();
		lichess.initalizeLichess();
	});

	$('#playoppositeside').on('change', function () {
		confirmOnlyOneOption();
		setFlipped();
	});

	$('#Light-Color').on('change', function () {
		changecolor();
		setColorPickers();
	});

	$('#Light-Color').on('click', function () {
		$(this).select();
	});

	$('#Dark-Color').on('change', function () {
		changecolor();
		setColorPickers();
	});

	$('#Dark-Color').on('click', function () {
		$(this).select();
	});

	$('#ĺoad_lichess_studies').on('click', function () {
		// Use API connection to Lichess
		(async () => {
			await loadLichessData();

			// Expand the study list with the refreshed data if currently collapsed
			if ($('#lichess_studies_button').hasClass('collapsed') === true) {
				$('#lichess_studies_button').click();
			}
		})();
	});

	$('#btn_library').on('click', async function () {
		await $('#librarymodal').modal('show');

		// Add check here to only do this IF the modal is empty (reuse data where possible)
		if ($('#lichess_studies_list').children().length === 0) {
			$('#ĺoad_lichess_studies').click();
		}
	});

	$('#lichess_studies_header').on('click', async function () {
		// Add check here to only do this IF the modal is empty (reuse data where possible)
		// Realistically, this should never trigger since you shouldn't have the option to
		// click this while the listing is empty since it would have been already populated
		// when the modal was opened.  Nevertheless, keeping it here just in case.
		if ($('#lichess_studies_list').children().length === 0) {
			$('#ĺoad_lichess_studies').click();
		}
	});

	// Set up the color pickers
	$(document).ready(function () {
		$('.colorpicker').each(function () {
			$(this).minicolors({
				control: 'wheel',
				format: 'hex',
				letterCase: 'lowercase',
				theme: 'bootstrap',
			});
		});
	});

	$('#light-color-block').on('colorchange', function () {
		var color = $(this).wheelColorPicker('value');
		$('#light-color-preview').css('background-color', color);
		$('#Light-Color').val(color);
		changecolor();
	});

	$('#dark-color-block').on('colorchange', function () {
		var color = $(this).wheelColorPicker('value');
		$('#dark-color-preview').css('background-color', color);
		$('#Dark-Color').val(color);
		changecolor();
	});

	// Tooltip
	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
	});

	// Workaround for iOS devices to remove PGN filter for file selection
	// Issue: https://github.com/rodpolako/Chess-PGN-Trainer/issues/13
	// See:
	// 		https://caniuse.com/input-file-accept
	// 		https://stackoverflow.com/questions/47386981/input-type-file-attribute-accept-not-working-in-safari-on-macbook
	// 		https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
	$(document).ready(function () {
		var deviceAgent = navigator.userAgent.toLowerCase();
		if (deviceAgent.match(/(iphone|ipod|ipad|macintosh|intel mac)/)) {
			$('#openPGN').attr('accept', '');
		}
	});

	$(window).on('resize', function () {
		resizeBoards();
	});

	document.addEventListener('hidden.bs.offcanvas', function () {
		$(document.body).css('overflow', 'hidden');
	});

	// Add blur action to all buttons (resolves issue with aria-hidden warnings)
	$('button').on('click', function () {
		$(this).blur();
	});

	// Pause game if user switched tabs, apps or turned off the screen
	$(document).on('visibilitychange', function () {
		if (document.hidden) {
			// Pause the game if the pause button is not disabled (ie: able to pause the game) AND the game is not already paused
			if (!$('#btn_pause').prop('disabled') && pauseflag === false) {
				pauseGame();
			}
		}
	});

});

/**
 * Initialze the application once everything is loaded
 *
 */
document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		initialize();
	}
};

export { resetGame, postPGNReadSetup };
