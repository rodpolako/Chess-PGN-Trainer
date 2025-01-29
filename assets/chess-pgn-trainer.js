/*
 * Chess-PGN-Trainer
 */

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global Chess, Chessboard, PieceList, annotateShapes, annotate */
/* global $, document, localStorage, navigator, window, console,  */
/* global markError, deleteAllShapeAnnotations, stripNewLine, promotionSquare:writeable */
/* global drawDot, clearAllDots, getPieces, onPromotionDialogClose*/

/* eslint no-unused-vars: "error"*/
/* exported deleteItem, resizeBoards, resetSettings, setFlipped, goToNextPuzzle */
/* exported loadPGNFile, outputStats2CSV, currentPuzzle, promotionSquare,  */

/*

COMPLETE:
* Update analysis link to always send current position instead of puzzle beginning.
* Update the handling of null moves
* Fixed a bug where moving a piece from a square that had a circle would require a double-click to drop in new location

*/

// -----------------------
// Define global variables
// -----------------------

// Board & Overall configuration-related variables
const version = "1.11.1";
let board;
let blankBoard;
let pieceThemePath;
let game;
let config;
let AnalysisLink = false;

// Game & Performance variables
let moveCfg;
let moveHistory;
let puzzleset;
let currentPuzzle;
let errorcount;
let error;
let ElapsedTimehhmmss;
let AvgTimehhmmss;
let ErrorRate;
let setcomplete;
let stats;
let puzzlecomplete = false;
let pauseflag = false;
let increment = 0;
let PuzzleOrder = [];

// Time-related variables
let PauseStartDateTime;
let PauseendDateTime;
let startDateTime = new Date();
let pauseDateTimeTotal = 0;

// -------------
// Initial Setup
// -------------

// Version number of the app
$("#versionnumber").text(`${version}`);
$("#versionnumber_sidebar").text(`${version}`);

// Collection of checkboxes used in the app
let checkboxlist = ["#playbothsides", "#playoppositeside", "#randomizeSet", "#flipped", "#analysisboard", "#manualadvance"];

// Collection of text elements
let messagelist = ["#puzzlename", "#errors", "#errorRate", "#elapsedTime", "#avgTime"];

// Assign default configuration of the board
// Assign default theme for the pieces for both the board and the promotion popup window

//pieceThemePath = 'https://github.com/lichess-org/lila/raw/refs/heads/master/public/piece/alpha/{piece}.svg'
pieceThemePath = "img/chesspieces/staunty/{piece}.svg";

// -----------------------
// Local stoarge Functions
// -----------------------

/**
 * Save a key/value pair to local storage
 * @param {string} key - The name of the key
 * @param {string} value - The value of the key
 */
function saveItem(key, value) {
	localStorage.setItem(key, value);
}

/**
 * Read the value of a specific key from local storage
 * @param {String} key - The key name for which the value is to be read
 * @returns {string}
 */
function readItem(key) {
	let value = localStorage.getItem(key);
	return value;
}

/**
 * Deletes the specified key from local storage
 * @param {string} key - The key to delete
 */
function deleteItem(key) {
	localStorage.removeItem(key);
}

/**
 * Clear all items in local storage
 */
function clearItems() {
	localStorage.clear();
}

// -----------------------------------
// Functions for related to appearance
// -----------------------------------

/**
 * Populate the piece selection drop down with the list of pieces
 */
function addPieceSetNames() {
	// Clear any pre-existing values
	$("#piece-select").find("option").remove().end();

	// Populate the dropdown with the available options
	PieceList.forEach((theme) => {
		var newOption = $("<option>");
		newOption.attr("value", theme.DirectoryName).text(theme.Name);
		$("#piece-select").append(newOption);
	});

	// Set the drop down to the saved value
	$("#piece-select").prop("selectedIndex", readItem("pieceIndex"));
}

/**
 * Sets the piece theme.  Warning: This will reset the board. Don't use while doing a set.
 */
function changePieces() {
	saveItem("pieceIndex", $("#piece-select").prop("selectedIndex"));

	// Load the selected piece theme into a temp object
	var pieceObject;
	pieceObject = PieceList.find((x) => x.DirectoryName === $("#piece-select").val());

	// Build the path to the piece theme using the object properties
	pieceThemePath = "img/chesspieces/" + pieceObject.DirectoryName + "/{piece}." + pieceObject.Type;

	// Set the updated board configuration
	setBoardConfig();

	// Update the board with the new pieces
	Chessboard("myBoard", config);

	// Set the colors after the piece change
	changecolor();

	// Reset the game
	resetGame();
}

/**
 * Applies the specified color values (RGB) to the board
 *
 * @param {string} light - The RGB color value for the light squares (such as h1)
 * @param {string} dark - The RGB color value for the dark squares (such as a1)
 */
function setBoardColor(light, dark) {
	$(".white-1e1d7").css({ backgroundColor: light, color: dark });
	$(".black-3c85d").css({ backgroundColor: dark, color: light });
}

/**
 * Sets the values for the board color based on selections via the color picker or manual entry
 * and then applies the values to the board
 */
function changecolor() {
	// Read the values from the color picker inputs
	var light = $("#Light-Color").val();

	var dark = $("#Dark-Color").val();

	// Update the board colors based on the values
	setBoardColor(light, dark);

	// Set preview boxes to the colors too
	$("#light-color-preview").css("background-color", light);
	$("#dark-color-preview").css("background-color", dark);

	// Save updated values
	saveItem("light", light);
	saveItem("dark", dark);
}

/**
 * Toggles the application between dark and light mode.  Saves current setting to file
 */
function toggleDarkMode() {
	// Check current status of the setting, flip it and then save
	if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
		document.documentElement.setAttribute("data-bs-theme", "light");

		saveItem("darkmode", "0");

		// change logo
		$("#img_logo").attr("src", "./img/github-mark.svg");
		$("#img_logo2").attr("src", "./img/github-mark.svg");
		$("#chk_darkmode").prop("checked", false);
	} else {
		document.documentElement.setAttribute("data-bs-theme", "dark");

		saveItem("darkmode", "1");
		// change logo
		$("#img_logo").attr("src", "./img/github-mark-white.svg");
		$("#img_logo2").attr("src", "./img/github-mark-white.svg");
		$("#chk_darkmode").prop("checked", true);
	}
}

/**
 * Resize both boards to available space
 */
function resizeBoards() {
	board.resize();
	blankBoard.resize();
	changecolor();
	if (puzzleset.length === 0) {
		return;
	}
	annotateShapes();
}

/**
 * Update the on-screen board with the current status of the game
 *
 * @param {boolean} animate - Set to True to animate the pieces while setting up the position.
 * 							  Setting to false sets the pieces instantly.
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
function initalize() {
	loadSettings();
	addPieceSetNames();
	changePieces();
	resetGame();
	resizeBoards();
}

/**
 * Sets default values for board color and piece theme
 */
function resetSettings() {
	clearItems();
	initalize();

	// Check to see if dark mode is active currently which is not the default and change back to light mode if that is the case
	if (document.documentElement.getAttribute("data-bs-theme") == "dark" && readItem("darkmode") == "0") {
		toggleDarkMode();
	}

	// Set the color pickers to the current values
	setColorPickers();
}

/**
 * Load the settings for the application.  Sets defaults if values are not found
 */
function loadSettings() {
	// Set defaults if running for the first time

	// Default keys and values
	var defaults = {
		light: "#dee3e6",
		dark: "#8ca2ad",
		pieceIndex: "0",
		darkmode: "0",
		copy2clipboard: "1",
		csvheaders: "1",
		legalmoves: "1",
		speed: 200,
	};

	// Load defaults if any keys are missing
	for (const [key, value] of Object.entries(defaults)) {
		if (readItem(key) == null || readItem(key) == "") {
			saveItem(key, value);
		}
	}

	// Load color values into the settings modal UI
	$("#Light-Color").val(readItem("light"));
	$("#Dark-Color").val(readItem("dark"));

	// Toggle dark mode if previously set
	if (readItem("darkmode") == "1") {
		toggleDarkMode();
	}

	// Auto-copy to clipboard setting
	if (readItem("copy2clipboard") == "1") {
		$("#chk_clipboard").prop("checked", true);
	}

	// CSV Headers setting
	if (readItem("csvheaders") == "1") {
		$("#chk_csvheaders").prop("checked", true);
	}

	// Legal Moves setting
	if (readItem("legalmoves") == "1") {
		$("#chk_legalMoves").prop("checked", true);
	}

	$("#speedRange").val(readItem("speed"));
}


/**
 * Adjust the saved speed value based on the slider setting
 */
function adjustspeedslider() {
	saveItem("speed", $("#speedRange").val());

	// Reset the game
	resetGame();
}

/**
 * Show the settings modal
 */
function setColorPickers() {
	var light = $("#Light-Color").val();
	$("#Light-Color").minicolors("value", light);

	var dark = $("#Dark-Color").val();
	$("#Dark-Color").minicolors("value", dark);
}

/**
 * Since it is non-sensical to have both selected, only allow either "Play both sides" or "Play opposite side"
 * to be checked but not both.
 */
function confirmOnlyOneOption() {
	// Clear both options if somehow both options get checked (ex: both options enabled via PGN tag)
	if ($("#playoppositeside").is(":checked") && $("#playbothsides").is(":checked")) {
		$("#playbothsides").prop("checked", false);
		$("#playoppositeside").prop("checked", false);
		$("#playbothsides").prop("disabled", false);
		$("#playoppositeside").prop("disabled", false);
	}

	// Enable both options as long as neither option is already checked
	if (!$("#playoppositeside").is(":checked") && !$("#playbothsides").is(":checked")) {
		$("#playbothsides").prop("disabled", false);
		$("#playoppositeside").prop("disabled", false);
	}

	// Disable "Play opposite side" since "Play both sides" is checked
	if ($("#playbothsides").is(":checked")) {
		$("#playoppositeside").prop("disabled", true);
	}

	// Disable "Play both sides" since "Play opposite side" is checked
	if ($("#playoppositeside").is(":checked")) {
		$("#playbothsides").prop("disabled", true);
	}
}

/**
 * Normal usage of "Play Opposite side" involves playing from the other side of the board.  Thus, if this option is
 * selected, then also turn on "Flipped".
 */
function setFlipped() {
	// If playoppositeside is checkd, also turn on flipped
	if ($("#playoppositeside").is(":checked")) {
		$("#flipped").prop("checked", true);
	}
}

/**
 * Either turn on or off the ability to select options (ie: don't allow changes while in a game)
 *
 * @param {boolean} state - Set to true to enable the checkboxes. Set to false to disable the checkboxes.
 */
function setCheckboxSelectability(state) {
	for (var checkboxelement of checkboxlist) {
		if (state) {
			if ($(checkboxelement).prop("disabled")) {
				$(checkboxelement).removeAttr("disabled");
				confirmOnlyOneOption();
			}
		} else {
			$(checkboxelement).attr("disabled", true);
		}
	}
}

/**
 * Set the CSS display and disabled properties of a given element
 *
 * @param {array} listofElements - Array of controls to set in JQuery naming format (ie: prefaced with #)
 * @param {string} visible - Set to "block" to make the control visible. Set to "none" to hide the control.
 * @param {boolean} disabled - Set to true to disable the control. Set to false to enable the control.
 */
function setDisplayAndDisabled(listofElements, visible, disabled) {
	for (var elementName of listofElements) {
		// Set the visibility of the element
		if (visible !== undefined) {
			$(elementName).css("display", visible);
		}

		// Set the status of the disabled property of the element
		if (disabled !== undefined) {
			$(elementName).prop("disabled", disabled);
		}
	}
}

/**
 * Toggle the local file value for a specific setting based on checkbox status
 *
 * @param {string} elementname - The name of the checkbox (pre-pend with a #)
 * @param {string} dataname - The key name of the element in local storage
 */
function toggleSetting(elementname, dataname) {
	// Default value
	saveItem(dataname, "0");

	// Set to "1" (aka "True" or "On") if checked
	if ($(elementname).is(":checked")) {
		saveItem(dataname, "1");
	}
}

// ------------------
// Gameplay functions
// ------------------

/**
 * Manually advance to next puzzle (used for the Next button)
 */
function goToNextPuzzle() {
	loadPuzzle(puzzleset[PuzzleOrder[increment]]);
}

/**
 * Compare latest played move to the move in the same position as the PGN
 *
 * @returns {string}
 */
function checkAndPlayNext(target) {
	let gameMoveIndex = game.history().length - 1;
	// Need to go this way since .moveNumber isn't working...

	if (game.history()[gameMoveIndex] === moveHistory[gameMoveIndex]) {
		// correct move
	
		// Post-move functions
		moveMade(); 

		// play next move if the "Play both sides" box is unchecked and there are still moves to play
		if (!$("#playbothsides").is(":checked")) {
			if (game.history().length !== moveHistory.length) {

				// Play the opponent's next move from the PGN
				game.move(moveHistory[game.history().length]);

				// Post-move functions
				moveMade(); 
			}
		}
	} else {
		// wrong move

		if (error === false) {
			// Add one to the error count for any given puzzle
			errorcount += 1;
		}
		error = true;

		// Flash the square in red to indicate an error
		markError(target);

		// Undo that move from the game
		game.undo();

		// Snap the bad piece back
		return "snapback";
	}

	// Check if all the expected moves have been played
	if (game.history().length === moveHistory.length) {
		puzzlecomplete = true;

		// Turn on the next button
		$("#btn_next").prop("disabled", false);

		// Check to see if this is the last puzzle
		if (increment + 1 === puzzleset.length) {
			setcomplete = true;
		}

		// Are there more puzzles to go?  If yes, load the next one in the sequence
		if (increment < puzzleset.length - 1) {
			increment += 1;

			// Auto advance to the next puzzle if the "Next Button" option is not selected
			if (!$("#manualadvance").is(":checked")) {
				loadPuzzle(puzzleset[PuzzleOrder[increment]]);
			}
		}
	}

	// Stop once all the puzzles in the set are done
	if (setcomplete && puzzlecomplete) {
		// Show the stats
		generateStats();
		showStats();

		// Hide & disable the "Start" and "Pause" buttons
		setDisplayAndDisabled(["#btn_starttest", "#btn_pause", "#btn_next"], "none", true);

		// Show "Restart" button
		setDisplayAndDisabled(["#btn_restart"], "inline-block", false);

		// Clear the move indicator
		$("#moveturn").text("");
	}
}

/**
 * Clear all the on-screen messages
 */
function clearMessages() {
	for (var messageelement of messagelist) {
		$(messageelement).text("");
	}
}

/**
 * Indicate who's turn it is to move
 */
function indicateMove() {
	$("#moveturn").text("White to move");

	if (game.turn() === "b") {
		$("#moveturn").text("Black to move");
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
		$("#btn_pause").text("Resume");

		pauseflag = true;
		PauseStartDateTime = new Date();

		// hide the board
		$("#myBoard").css("display", "none");
		$("#blankBoard").css("display", "block");

		// Remove focus on the pause/resume button
		$("#btn_pause").blur();

		// Disable the Hint, Reset, Next and Open PGN buttons while paused
		$("#btn_reset").prop("disabled", true);
		$("#openPGN_button").prop("disabled", true);
		$("#btn_hint").prop("disabled", true);

		break;

	case true:
		$("#btn_pause").text("Pause");

		pauseflag = false;
		PauseendDateTime = new Date();

		// Keep running total of paused time
		pauseDateTimeTotal += PauseendDateTime - PauseStartDateTime;

		// show the board
		$("#myBoard").css("display", "block");
		$("#blankBoard").css("display", "none");

		// Remove focus on the pause/resume button
		$("#btn_pause").blur();

		// Re-enable the Hint, Reset and Open PGN buttons
		$("#btn_reset").prop("disabled", false);
		$("#openPGN_button").prop("disabled", false);
		$("#btn_hint").prop("disabled", false);

		break;
	}

	$(window).trigger("resize");
	changecolor();
}


/**
 * Set the configuration for the board prior to creating/re-creating the board(s)
 */
function setBoardConfig() {
	if (readItem("speed") == null || readItem("speed") == "") {
		saveItem("speed", 200);
	}

	// Initial Board Configuration
	config = {
		draggable: true,
		pieceTheme: pieceThemePath,
		onDragStart: dragStart,
		onDrop: dropPiece,
		onSnapEnd: snapEnd,
		moveSpeed: parseInt(readItem("speed")),
		position: "start",
	};
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
	AnalysisLink = false;

	puzzlecomplete = false;
	pauseflag = false;
	increment = 0;
	PuzzleOrder = [];

	// Create the boards
	setBoardConfig();
	board = new Chessboard("myBoard", config);
	blankBoard = new Chessboard("blankBoard", { showNotation: false });

	// chessboardjs-specific additions and stylings to center the board in bootstrap
	$(".board-b72b1").addClass("container p-0");
	$(".board-b72b1").css({
		border: "0px",
		"margin-left": "auto",
		"margin-right": "auto",
	});
	$(".chessboard-63f37").css("position", "relative");

	// Set the counters back to zero
	$("#puzzleNumber").text("0");

	$("#puzzleNumbertotal").text("0");

	// Show Start button and hide "Pause" and "Restart" buttons
	setDisplayAndDisabled(["#btn_starttest"], "inline-block", true);
	setDisplayAndDisabled(["#btn_pause", "#btn_restart", "#btn_next"], "none", false);

	// Hide & disable the "Hint" and the "Show Results" buttons
	setDisplayAndDisabled(["#btn_hint", "#btn_showresults"], "none", true);

	// Show the full board (in case the reset happened during a pause)
	$("#myBoard").css("display", "block");
	$("#blankBoard").css("display", "none");

	// Reset the progress bar
	$("#progressbar").width("0%");
	$("#progressbar").text("0%");

	// Disable options checkboxes
	setCheckboxSelectability(false);

	// Clear the checkboxes
	for (var checkboxelement of checkboxlist) {
		$(checkboxelement).prop("checked", false);
	}

	// Remove focus on the reset button
	$("#btn_reset").blur();

	// Clear any prior results/statistics
	clearMessages();

	// Clear the analysis link
	$("#analysisDiv").empty();

	// Clear the move indicator
	$("#moveturn").text("");

	// Close the sidebar
	$("#close_sidebar").click();

	changecolor();

	// Clear the content title and window
	$("#comment_event_name").prop("innerHTML", "");
	$("#comment_annotation").prop("innerHTML", "");
	//console.clear();
}

/**
 * Show the hint
 */
function showHint() {
	// Change the text of the button to the correct move
	$("#btn_hint").text(moveHistory[game.history().length]);

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
	$("#resmodal").modal("show");
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

	// Hide "Start", "Restart" & "Show Results" buttons
	setDisplayAndDisabled(["#btn_starttest", "#btn_restart", "#btn_showresults"], "none");

	// Show & enable the "Hint" and "Pause" buttons
	setDisplayAndDisabled(["#btn_pause", "#btn_hint"], "inline-block", false);

	// Only turn on the next button if the option is selected (at the start it is disabled)
	if ($("#manualadvance").is(":checked")) {
		setDisplayAndDisabled(["#btn_next"], "inline-block", true);
	}

	// Disable changing options
	setCheckboxSelectability(false);

	// Clear any messages
	clearMessages();

	deleteAllShapeAnnotations();

	// Clear the analysis link
	$("#analysisDiv").empty();

	// Load first puzzle and start counting for errors (for now...)
	errorcount = 0;

	// Get current date/time
	startDateTime = new Date();
	pauseDateTimeTotal = 0;
	increment = 0;
	setcomplete = false;

	// Neat bit here from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
	const arrayRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

	// Shuffle the set if the box is checked
	if ($("#randomizeSet").is(":checked")) {
		// Generate numbers between 1 and the number of puzzles in the PGN and then shuffle them
		PuzzleOrder = shuffle(arrayRange(0, puzzleset.length - 1, 1));
	} else {
		// Generate numbers between 1 and the number of puzzles in the PGN in order
		PuzzleOrder = arrayRange(0, puzzleset.length - 1, 1);
	}

	// Now just need to send the desired puzzle to the board.
	loadPuzzle(puzzleset[PuzzleOrder[increment]]);
}

/**
 * Shuffle contents of an array into random order
 *
 * Credit for this function goes to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * @param {array} array - The array to be shuffled
 * @returns {array}
 */
function shuffle(array) {
	let currentIndex = array.length;
	let randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

/**
 * Updates the progress bar on the screen
 *
 * @param {int} partial_value - The number of completed puzzles (numerator)
 * @param {int} total_value - The total number of puzzles (denominator)
 */
function updateProgressBar(partial_value, total_value) {
	// Do the math
	const progress = Math.round((partial_value / total_value) * 100);

	// Show the result
	let progresspercent = progress + "%";
	$("#progressbar").width(progresspercent);
	$("#progressbar").text(progresspercent);
}


/**
 * Create a link of the current position to lichess analysis board
 */
function updateAnalysisLink() {
	
	if (game.fen()) {
		var lichessURL = '<A id="analysisURL" HREF="https://lichess.org/analysis/' + game.fen().replace(/ /g, "_") + '" target="_blank" ></A>';
	}

	if (AnalysisLink && lichessURL) {
		// Add the link under the puzzle name in mobile mode
		$("#puzzlename").append("<br>");
		$("#puzzlename").append(lichessURL);
		$("a#analysisURL").text("Analysis board");

		// Add the link under the event name in the annotation panel
		$("#analysisDiv").empty();
		$("#analysisDiv").append(lichessURL);
		$("a#analysisURL").text("Analysis board");
		$("#comment_event_name_analysis_link").show();
	}
	
}

/**
 * Common functions required after making a move
 */
function moveMade() { 

	// Output any comment after this move
	annotate();

	// Update the analysis link (if enabled)
	updateAnalysisLink();
}

/**
 * Load the desired puzzle or position from the PGN to the screen
 *
 * @param {object} PGNPuzzle - The object representing a specific position and move sequence
 */
function loadPuzzle(PGNPuzzle) {
	//console.log(PGNPuzzle);
	let moveindex = 0;

	// Clear the content title and window
	$("#comment_event_name").prop("innerHTML", "");
	$("#comment_annotation").prop("innerHTML", "");
	$("#analysisDiv").empty();

	// Clear any current drawings on the board
	deleteAllShapeAnnotations();

	// Update the screen with the value of the PGN Event tag (if any)
	$("#puzzlename").html(PGNPuzzle.tags.Event);
	$("#comment_event_name").append(PGNPuzzle.tags.Event);

	// Output a link to a lichess analysis board for this puzzle if there is one (can extract FEN from there if needed)
	AnalysisLink = false;
	if ($("#analysisboard").is(":checked")) {
		AnalysisLink = true;
	}

	currentPuzzle = PGNPuzzle; // Use this in order to access the PGN from anywhere

	// Display current puzzle number in the sequence
	$("#puzzleNumber").text(increment + 1);

	updateProgressBar(increment, puzzleset.length);

	// Turn off the next button at the start
	$("#btn_next").prop("disabled", true);

	// Set the error flag to false for this puzzle (ie: only count 1 error per puzzle)
	error = false;
	puzzlecomplete = false;

	// Load the board position into memory
	game = new Chess(PGNPuzzle.tags.FEN);

	// Load the moves of the PGN into memory
	PGNPuzzle.moves.forEach((move) => game.move(move.notation.notation));

	// Copy the move order from the PGN into memory
	moveHistory = game.history();

	// Set the board position to the opening in the puzzle (ie: undo all steps in the PGN)
	while (game.undo() !== null) {
		game.undo();
	}

	// Clear the board
	board.clear();

	// Set the board orientation based on game.turn()
	let boardOrientation = game.turn();

	// Check for presense of MoveColor tag and if available use that instead
	if (typeof PGNPuzzle.tags.MoveColor !== "undefined") {
		boardOrientation = PGNPuzzle.tags.MoveColor;
	}

	// Get the current status of the board.  Use it to determine if the board needs to be flipped based on the puzzle.
	let currentBoardOrientation = board.orientation().substring(0, 1).toLowerCase();

	// Now that orientation is determined, flip the board if the current orientation does not match the determined one
	if (boardOrientation != currentBoardOrientation) {
		board.flip();
	}

	// Set the board to the beginning position of the puzzle
	updateBoard(false);

	$("#comment_annotation").append("<br>");

	// If there is commentary before the first move, show it in the annotation panel
	if (PGNPuzzle.gameComment != null) {
		$("#comment_annotation").prop("innerHTML", stripNewLine(PGNPuzzle.gameComment.comment));
		$("#comment_annotation").append("<br><br>");

		// Scroll to the bottom of the content
		$("#comment_panel").scrollTop($("#comment_panel").prop("scrollHeight"));

		// Draw any shapes if present
		annotateShapes();
		
	}


	// Check to see if the computer needs to play the first move due to the conflict between the FEN and the MoveColor tag (unless player is playing both sides)
	if (PGNPuzzle.tags.MoveColor != game.turn() && typeof PGNPuzzle.tags.MoveColor !== "undefined" && !$("#playbothsides").is(":checked")) {
		
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
	if ($("#flipped").is(":checked")) {
		board.flip();
	}

	// Play the first move if player is playing second and not both sides
	if ($("#playoppositeside").is(":checked") && !$("#playbothsides").is(":checked")) {
		
		// Make the move
		game.move(moveHistory[moveindex]);
		
		// Set the board to the next position of the puzzle
		updateBoard(true);

		// Post-move functions
		moveMade(); 
	}

	// Update the status of the game in memory with the new data
	indicateMove();

	changecolor();

	// Put up the analysis link (if enabled)
	updateAnalysisLink();

}

/**
 * Attempt to add the chosen move to the current game
 *
 * @param {chess} game - The current chess.js object
 * @param {object} cfg - The configuration of the current move (from, to, promotion)
 * @returns {string}
 */
function makeMove(game, cfg) {
	// see if the move is legal
	let move = game.move(cfg);

	// illegal move
	if (move === null) {
		return "snapback";
	}
}

// -----------------------
// Chessboard JS functions
// -----------------------

/**
 * Handle the start of moving a piece on the board
 *
 * @param {*} source - The source square from where the piece started
 * @param {*} piece - A chess.js game piece
 * @param {*} position - The position of the board
 * @param {*} orientation - The board orientation
 * @returns {boolean}
 */
function dragStart(source, piece) {
	// Only pick up pieces for the side to move
	if ((game.turn() === "w" && piece.search(/^b/) !== -1) || (game.turn() === "b" && piece.search(/^w/) !== -1)) {
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
	if (readItem("legalmoves") == "1") {
		legalMoves.forEach((move) => {
			drawDot(move.to);
		});
	}

	// Clear last error element
	$(".error").remove();
}

/**
 * Handle the end of moving a piece on the board
 *
 * @param {*} source - The source square from where the piece started
 * @param {*} target - The target square to where the piece ended
 * @returns {string}
 */
function dropPiece(source, target) {
	// remove all legal move dots from the board
	clearAllDots();

	// is it a promotion?
	const source_rank = source.substring(2, 1);
	const target_rank = target.substring(2, 1);
	const piece = game.get(source).type;

	// First attempt at move
	// see if the move is legal
	moveCfg = {
		from: source,
		promotion: "q",
		to: target,
	};

	if (makeMove(game, moveCfg) === "snapback") {
		return "snapback"; // Not a legal move (including dropping it where you started).  Go back.
	}

	game.undo(); // move is ok, now we can go ahead and check for promotion

	// Check is this is a promotion
	if (piece === "p" && ((source_rank === "7" && target_rank === "8") || (source_rank === "2" && target_rank === "1"))) {
		// Define the target square for move evaluation
		promotionSquare = target;

		// Get the correct color pieces for the promotion popup
		getPieces();

		// Show the select piece promotion dialog screen
		$("#pawnPromotion").modal("show");

		return;
	}

	// Not a promotion, go ahead and move
	makeMove(game, moveCfg);

	// Check if the move played is the expected one and play the next one if it was
	checkAndPlayNext(target);

	// Indicate the player to move
	indicateMove();

	// Clear the move indicator if everything is done
	if (setcomplete || puzzlecomplete) {
		$("#moveturn").text("");
	}

	// Clear the hint if used
	$("#btn_hint").text("Hint");
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
function testClipboard() {
	try {
		navigator.clipboard.writeText("Test");
	} catch (err) {
		// Cannot write to the clipboard
		console.log(err);

		// Turn off the setting
		$("#chk_clipboard").prop("checked", false);

		// Disable the copy to clipboard button on the results modal
		$("#copyToClipboard").prop("disabled", true);

		// Update the setting save to turn this off
		saveItem("copy2clipboard") == "0";

		return false;
	}

	// Since we can copy to the clipboard, go ahead and allow the toggle change
	toggleSetting("#chk_clipboard", "copy2clipboard");

	return true;
}

/**
 * Output the stats to the clipboard
 */
function outputStats2Clipboard() {
	// Copy Tab-delimited version to clipboard for easy pasting to spreadsheets

	if (testClipboard()) {
		navigator.clipboard.writeText(Object.values(stats).join("\t"));
	}
}

/**
 * Output the stats to a csv file
 */
function outputStats2CSV() {
	// Adapted from https://stackoverflow.com/questions/61339206/how-to-export-data-to-csv-using-javascript
	let csvHeader = "";
	let csvBody = Object.values(stats).join(",") + "\n";
	let datetimestamp = new Date()
		.toISOString()
		.replace(/[^0-9]/g, "")
		.slice(0, -3);
	var hiddenElement = document.createElement("a");

	// add the header row if option is selected
	if (readItem("csvheaders") == "1") {
		csvHeader = Object.keys(stats).join(",") + "\n";
	}

	hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvHeader + csvBody);
	hiddenElement.target = "_blank";
	hiddenElement.download = datetimestamp + ".csv";
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
	ElapsedTimehhmmss = new Date(ElapsedTimeSeconds * 1000).toISOString().slice(11, 19);
	const AvgTimeSeconds = Math.round(ElapsedTimeSeconds / puzzleset.length);
	AvgTimehhmmss = new Date(AvgTimeSeconds * 1000).toISOString().slice(11, 19);
	ErrorRate = errorcount / puzzleset.length;

	// Get the filename of the PGN file
	// Adapted from https://stackoverflow.com/questions/857618/javascript-how-to-extract-filename-from-a-file-input-control
	var fullPath = $("#openPGN").val();
	var startIndex = fullPath.indexOf("\\") >= 0 ? fullPath.lastIndexOf("\\") : fullPath.lastIndexOf("/");
	var filename = fullPath.substring(startIndex);

	if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
		filename = filename.substring(1);
	}

	filename = filename.substring(0, filename.lastIndexOf("."));

	// Get the mode (random or sequential)
	var mode = "Sequential";
	if ($("#randomizeSet").is(":checked")) {
		mode = "Random";
	}

	// Build the stats object
	stats = {};

	stats.date = currentDate;
	stats.filename = filename;
	stats.round = "";
	stats.series = puzzleset[0].Series;
	stats.mode = mode;
	stats.setlength = puzzleset.length;
	stats.errors = errorcount;
	stats.totaltime = ElapsedTimehhmmss;
	stats.avgtime = AvgTimehhmmss;
	stats.errorrate = ErrorRate;
}

/**
 * Show the final stats after finishing all the puzzles in the set
 */
function showStats() {
	// Format the error rate to 1 decimal place
	const ErrorRate1Dec = stats.errorrate.toFixed(3) * 100;

	// Show 100% on the progress bar
	updateProgressBar(1, 1);

	// Show & enable "Show Results" button
	setDisplayAndDisabled(["#btn_showresults"], "inline-block", false);

	// Hide & disable the "hint" button
	setDisplayAndDisabled(["#btn_hint"], "none", true);

	// Update the results modal with the details
	$("#elapsedTime").text(`Elapsed time (hh:mm:ss): ${stats.totaltime}`);
	$("#avgTime").text(`Average time/puzzle (hh:mm:ss): ${stats.avgtime}`);
	$("#errors").text(`Number of errors: ${stats.errors}`);
	$("#errorRate").text(`Error Rate: ${ErrorRate1Dec.toFixed(1)}%`);

	// Display the modal
	showresults();

	// Copy results to clipboard for pasting into spreadsheet
	if ($("#chk_clipboard").is(":checked")) {
		outputStats2Clipboard();
	}

	// Re-enable options checkboxes
	setCheckboxSelectability(true);
}

// ------------------
// Button assignments
// ------------------
/**
 * Assign actions to the buttons
 */
$(() => {
	// Buttons
	$("#openPGN_button").click(() => {
		$("#openPGN").click();
	});

	$("#btn_reset").on("click", resetGame);

	$("#btn_showresults").on("click", showresults);

	$("#btn_hint").on("click", showHint);

	$("#btn_starttest").on("click", startTest);

	$("#btn_restart").on("click", startTest);

	$("#light-color-block").on("colorchange", function () {
		var color = $(this).wheelColorPicker("value");
		$("#Light-Color").val(color);
		changecolor();
	});

	$("#dark-color-block").on("colorchange", function () {
		var color = $(this).wheelColorPicker("value");
		$("#dark-color-preview").css("background-color", color);
		$("#Dark-Color").val(color);
		changecolor();
	});

	$("#btn_pause").on("click", pauseGame);

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	// Set up the color pickers
	$(document).ready(function () {
		$(".colorpicker").each(function () {
			$(this).minicolors({
				control: "wheel",
				format: "hex",
				letterCase: "lowercase",
				theme: "bootstrap",
			});
		});
	});

	$(".promo-button").on("click", function () {
		onPromotionDialogClose($(this));
	});

	$("#speedRange").on("change", function () {
		adjustspeedslider();
	});
});
