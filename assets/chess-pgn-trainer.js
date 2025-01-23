/*
 * Chess-PGN-Trainer
 */

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global Chess, Chessboard, PgnParser, FileReader */
/* global $, document, localStorage, alert, navigator, window, console */


/* eslint no-unused-vars: "error"*/
/* exported deleteItem, resizeBoards, resetSettings, setFlipped, goToNextPuzzle */
/* exported loadPGNFile, outputStats2CSV */

/*

COMPLETE:
Variation support
Add NAG to annotate feature

*/

// -----------------------
// Define global variables
// -----------------------

// Board & Overall configuration-related variables
const version = "1.10.1";
let board;
let blankBoard;
let pieceThemePath;
let game;
let config;
let PieceList;
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

// Promotion variables
let promoteTo;
let promotionDialog;

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

promotionDialog = $("#promotion-dialog");

// Initial Board Configuration
config = {
	draggable: true,
	pieceTheme: pieceThemePath,
	onDragStart: dragStart,
	onDrop: dropPiece,
	onSnapEnd: snapEnd,
	position: "start",
};

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
	$("#piece-select").prop('selectedIndex', readItem("pieceIndex"));
}

/**
 * Sets the piece theme.  Warning: This will reset the board. Don't use while doing a set.
 */
function changePieces() {

	saveItem("pieceIndex", $("#piece-select").prop('selectedIndex'));

	// Load the selected piece theme into a temp object
	var pieceObject;
	pieceObject = PieceList.find((x) => x.DirectoryName === $("#piece-select").val());

	// Build the path to the piece theme using the object properties
	pieceThemePath = "img/chesspieces/" + pieceObject.DirectoryName + "/{piece}." + pieceObject.Type;

	config = {
		draggable: true,
		pieceTheme: pieceThemePath,
		onDragStart: dragStart,
		onDrop: dropPiece,
		onSnapEnd: snapEnd,
		position: "start",
	};

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
}

/**
 * Show the settings modal
 */
function setColorPickers() {
	 

	var light = $("#Light-Color").val();
	$("#Light-Color").minicolors("value",light);

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
function setFlipped(){

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
 * Replace CR/LR and LF with <br> for breaks in the annotation window.  Helper function for annotate()
 * @param {string} sourcetext - The content to have the CR/LF and LF codes swapped with <br> 
 * 
 * @returns {string}
*/
function stripNewLine(sourcetext) {

	if (!sourcetext) { return; }
	
	let strippedtext;

	strippedtext = sourcetext.replaceAll('\r\n','<br>'); // Windows CR/LF
	strippedtext = sourcetext.replaceAll('\n','<br>'); // Linux LF
	
	return strippedtext;
}



/**
 * Update the annotation panel with the supplied text.  Helper function for annotate()
 * @param {string} annotationText - The content to be added to the annotation panel
*/
function addAnnotationComment(annotationText) {
	
	$("#comment_annotation").append("<br><br>");
	$("#comment_annotation").append(stripNewLine(annotationText));
	$("#comment_annotation").append("<br><br>");

}


/**
 * Look up the NAG symbol corresponding to the NAG code provided.  Helper function for annotate()
 * @param {string} NAGValue - The NAG code to be processed
 * 
 * @returns {string}
*/
function translateNAG(NAGValue) {

	// based on https://en.wikipedia.org/wiki/Portable_Game_Notation#Numeric_Annotation_Glyphs

	let NAGDictionary = [ 
		{code: '$0', number: 0, symbol: "", description: ""},
		{code: '$1', number: 1, symbol: "!", description: "Good move"},
		{code: '$2', number: 2, symbol: "?", description: "Mistake"},
		{code: '$3', number: 3, symbol: "!!", description: "Brilliant move"},
		{code: '$4', number: 4, symbol: "??", description: "Blunder"},
		{code: '$5', number: 5, symbol: "!?", description: "Interesting move"},
		{code: '$6', number: 6, symbol: "?!", description: "Dubious move"},
		{code: '$7', number: 7, symbol: "\u25a1", description: "Only move"},
		{code: '$8', number: 8, symbol: "\u25a1", description: "Singular move"},
		{code: '$9', number: 9, symbol: "\u25a1", description: "Worst move"},
		{code: '$10', number: 10, symbol: "=", description: "Equal position"},
		{code: '$11', number: 11, symbol: "=", description: "Equal chances, quiet position"},
		{code: '$12', number: 12, symbol: "=", description: "Equal chances, active position"},
		{code: '$13', number: 13, symbol: "\u221e", description: "Unclear position"},
		{code: '$14', number: 14, symbol: "\u2a72", description: "White is slightly better"},
		{code: '$15', number: 15, symbol: "\u2a71", description: "Black is slightly better"},
		{code: '$16', number: 16, symbol: "\xb1", description: "White is better"},
		{code: '$17', number: 17, symbol: "\u2213", description: "Black is better"},
		{code: '$18', number: 18, symbol: "+-", description: "White is winning"},
		{code: '$19', number: 19, symbol: "-+", description: "Black is winning"},
		{code: '$22', number: 22, symbol: "\u2a00", description: "White is in Zugzwang"},
		{code: '$23', number: 23, symbol: "\u2a00", description: "Black is in Zugzwang"},
		{code: '$32', number: 32, symbol: "\u27f3", description: "White has development"},
		{code: '$33', number: 32, symbol: "\u27f3", description: "Black has development"},
		{code: '$36', number: 36, symbol: "\u2191", description: "White has the initiative"},
		{code: '$37', number: 37, symbol: "\u2191", description: "Black has the initiative"},
		{code: '$40', number: 40, symbol: "\u2192", description: "White has the attack"},
		{code: '$41', number: 41, symbol: "\u2192", description: "White has the attack"},
		{code: '$44', number: 44, symbol: "=\u221e", description: "White has compensation"}, 
		{code: '$45', number: 45, symbol: "=\u221e", description: "Black has compensation"}, 
		{code: '$132', number: 132, symbol: "\u21c6", description: "White has counterplay"},
		{code: '$133', number: 132, symbol: "\u21c6", description: "Black has counterplay"},
		{code: '$138', number: 138, symbol: "\u2295", description: "White has time trouble"},
		{code: '$139', number: 139, symbol: "\u2295", description: "Black has time trouble"},
		{code: '$140', number: 140, symbol: "\u2206", description: "With the idea"},
		{code: '$146', number: 146, symbol: "N", description: "Novelty"},
	];

	// Look up the symbol for the provided code
	let tag = NAGDictionary.find(({ code }) => code === NAGValue).symbol;
	
	return tag;
}


/**
 * Read details of the current move along with any avaialble annotations and display them
*/
function annotate() {
	
	let gameMoveIndex = game.history().length - 1;                              // Last move played
	let currentMoveTurn = currentPuzzle.moves[gameMoveIndex].turn;              // Color of move
	let moveNumber = currentPuzzle.moves[gameMoveIndex].moveNumber;             // Number of move in SAN
	let moveNotation = currentPuzzle.moves[gameMoveIndex].notation.notation;    // SAN move
	let nagcode = currentPuzzle.moves[gameMoveIndex].nag;						// NAG of move


	let nagAnnotation = '';
	if (nagcode) {  // Annotation code array found, retrieve each symbol to display next to the move
		nagcode.forEach(code =>{
			nagAnnotation += translateNAG(code);
		});
   	}
	
	// This assumes that index 0 ALWAYS has a move number associated with it.  Maybe write a case to handle if index=0 AND moveNumber is null?
	if (moveNumber == null) {
		
		// Assumption is that this is black so use the white number (1 move prior)
		moveNumber = currentPuzzle.moves[gameMoveIndex - 1].moveNumber;
	}

	let moveAnnotation = "";

	// Check if we are at the first move (special case in case black goes first)

	// Normal separator after the move #
	let separator = ". ";

	// Handling the first move depending on who goes first
	if (gameMoveIndex == 0) {
		
		if (currentMoveTurn == "b") {
			separator = "... ";
		}

		moveAnnotation = moveNumber + separator + moveNotation + nagAnnotation + " ";
		$("#comment_annotation").append($("<strong></strong>").text(moveAnnotation));
		
		
		if (currentPuzzle.moves[gameMoveIndex].commentAfter) {
			 addAnnotationComment(currentPuzzle.moves[gameMoveIndex].commentAfter);
		}

		return;
	}

	// Special: If the move is black but there was a comment prior, then use the continuation dots instead 
	// (otherwise it would have just been the previous white move)
	if (currentMoveTurn == "b" && typeof currentPuzzle.moves[gameMoveIndex - 1].commentAfter !== "undefined") {
		separator = "... ";
	}

	// Put the move #, separator ,NAG and a space
	moveAnnotation = moveNumber + separator + moveNotation + nagAnnotation + " ";

	// Normal continuation but it is black's move and there wasn't a comment prior so just continue on and don't repeat the move number
	if (currentMoveTurn == "b" && typeof currentPuzzle.moves[gameMoveIndex - 1].commentAfter === "undefined") {
		moveAnnotation = moveNotation + nagAnnotation + " ";
	}

	$("#comment_annotation").append($("<strong></strong>").text(moveAnnotation));

	// Output the comment after the move is played (if there is a comment)
	if (currentPuzzle.moves[gameMoveIndex].commentAfter) {
		addAnnotationComment(currentPuzzle.moves[gameMoveIndex].commentAfter);
	}

	// Add scroll here to automatically show the bottom of the column
	document.getElementById("comment_annotation").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
	
}

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
function checkAndPlayNext() {
	let gameMoveIndex = game.history().length - 1;
	// Need to go this way since .moveNumber isn't working...

	if (game.history()[gameMoveIndex] === moveHistory[gameMoveIndex]) {
		// correct move

		// Output any comment after this move
		annotate();

		// play next move if the "Play both sides" box is unchecked and there are still moves to play
		if (!$("#playbothsides").is(":checked")) {

			if (game.history().length !== moveHistory.length) {

				// Play the opponent's next move from the PGN
				game.move(moveHistory[game.history().length]);

				// Output any comment after this move
				annotate();

			}
		}
	} else {
		// wrong move

		if (error === false) {
			// Add one to the error count for any given puzzle
			errorcount += 1;
		}
		error = true;

		// Undo that move from the game
		game.undo();

		// Maybe flash the square in red to indicate an error?

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
 * Attempt to add the chosen move to the current game
 *
 * @param {chess} game - The current chess.js object
 * @param {object} cfg - The configuration of the current move (from, to, promotion)
 * @returns {string}
 */
function makeMove(game, cfg) {
	// see if the move is legal
	const move = game.move(cfg);

	// illegal move
	if (move === null) {
		return "snapback";
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
	board = new Chessboard("myBoard", config);
	blankBoard = new Chessboard("blankBoard", { showNotation: false });

	// chessboardjs-specific additions to center the board in bootstrap
	// add container class to chessboard-63f37 & board-b72b1 classes
	$(".board-b72b1").addClass("container p-0");
	$(".board-b72b1").css("border", "0px");

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
 * Load the desired puzzle or position from the PGN to the screen
 *
 * @param {object} PGNPuzzle - The object representing a specific position and move sequence
 */
function loadPuzzle(PGNPuzzle) {
	
	let moveindex = 0;

	// Clear the content title and window
	$("#comment_event_name").prop("innerHTML", "");
	$("#comment_annotation").prop("innerHTML", "");
	$("#analysisDiv").empty();

	// Update the screen with the value of the PGN Event tag (if any)
	$("#puzzlename").html(PGNPuzzle.tags.Event);
	$("#comment_event_name").append(PGNPuzzle.tags.Event);
	

	// Output a link to a lichess analysis board for this puzzle if there is one (can extract FEN from there if needed)
	AnalysisLink = false;
	if ($("#analysisboard").is(":checked")) {
		AnalysisLink = true;
	}

	if (PGNPuzzle.tags.FEN) {
		var lichessURL = '<A id="analysisURL" HREF="https://lichess.org/analysis/' + PGNPuzzle.tags.FEN.replace(/ /g, "_") + '" target="_blank"></A>';
	}

	if (AnalysisLink && lichessURL) {

		// Add the link under the puzzle name in mobile mode
		$("#puzzlename").append("<br>");
		$("#puzzlename").append(lichessURL);
		$('a#analysisURL').text('Analysis board');

		// Add the link under the event name in the annotation panel
		$("#analysisDiv").empty();
		$("#analysisDiv").append(lichessURL);
		$('a#analysisURL').text('Analysis board');
		$('#comment_event_name_analysis_link').show();
		
	}
	

	if (PGNPuzzle.gameComment != null) {
		
		$("#comment_annotation").prop('innerHTML',stripNewLine(PGNPuzzle.gameComment.comment));
		$("#comment_annotation").append("<br><br>");

		// Scroll to the bottom of the content
		$("#comment_panel").scrollTop($("#comment_panel").prop("scrollHeight"));
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

	// Check to see if the computer needs to play the first move due to the conflict between the FEN and the MoveColor tag (unless player is playing both sides)
	if (PGNPuzzle.tags.MoveColor != game.turn() && typeof PGNPuzzle.tags.MoveColor !== "undefined" && !$("#playbothsides").is(":checked")) {
		// There is a discrepency, make the first move
		game.move(moveHistory[moveindex]);

		// Set the board to the next position of the puzzle
		updateBoard(true);

		// Output any comment after this move
		annotate();

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

		// Output any comment after this move
		annotate();
	}

	// Update the status of the game in memory with the new data
	indicateMove();

	changecolor();
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
}

/**
 * Handle the end of moving a piece on the board
 *
 * @param {*} source - The source square from where the piece started
 * @param {*} target - The target square to where the piece ended
 * @returns {string}
 */
function dropPiece(source, target) {
	let move;

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

	move = game.move(moveCfg);

	if (move === null) {
		return "snapback";
	}


	game.undo(); // move is ok, now we can go ahead and check for promotion

	if (piece === "p" && ((source_rank === "7" && target_rank === "8") || (source_rank === "2" && target_rank === "1"))) {
		//promoting = true;

		// Get the correct color pieces for the promotion popup
		getPieces();

		// Show the select piece promotion dialog screen
		promotionDialog
			.dialog({
				close: onDialogClose,
				closeOnEscape: false,
				dialogClass: "noTitleStuff",
				draggable: false,
				height: 50,
				modal: true,
				resizable: true,
				width: 184,
			})
			.dialog("widget")
			.position({
				of: $("#myBoard"),
				// my: 'center center',
				// at: 'center center',   //Maybe add code to position near the pawn being promoted?
			});
		// the actual move is made after the piece to promote to
		// has been selected, in the stop event of the promotion piece selectable

		return;
	}

	// No promotion, go ahead and move
	makeMove(game, moveCfg);

	// Check if the move played is the expected one and play the next one if it was
	checkAndPlayNext();

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
	updateBoard(true);

}

// ------------------------
// Pawn Promotion functions
// ------------------------
/**
 * Get an individual piece image
 *
 * @param {chess} piece - A chess.js game piece
 * @returns {*}
 */
function getImgSrc(piece) {
	return pieceThemePath.replace("{piece}", game.turn() + piece.toLocaleUpperCase());
}

/**
 * Populate the pawn promotion popup based on the color of the current player
 */
function getPieces() {
	$(".promotion-piece-q").attr("src", getImgSrc("q"));
	$(".promotion-piece-r").attr("src", getImgSrc("r"));
	$(".promotion-piece-n").attr("src", getImgSrc("n"));
	$(".promotion-piece-b").attr("src", getImgSrc("b"));
}

/**
 * Set the promotion value in the move config and make the move
 */
function onDialogClose() {
	moveCfg.promotion = promoteTo;
	makeMove(game, moveCfg);
	checkAndPlayNext();
}


// ---------------------
// PGN related Functions
// ---------------------


/**
 * Split the PGN data into unique games based on presense of variants
 * @param {json} PGNData - The JSON formatted data parsed from the PGN parser
*/
function splitvariants(PGNData) {
        
	let PGNobjectArray = [];

	function createPGNVariant(myObject, pathlist) {

		let tempObj = [];
		Object.assign(tempObj,pathlist);

		myObject.forEach(element => {
			tempObj.push(element); // Add the current step

			if (element.variations.length > 0) { // alternate steps found...
				tempObj.pop(); // remove the current step that was added (since we are adding more inside)
				element.variations.forEach(child => createPGNVariant(child, tempObj)); // Explore that alternate path
				tempObj.push(element);     // Add back the current step to continue in the current path
			}

		});

		PGNobjectArray.push(tempObj); // Add this to the array of paths
	}

	// Now create an array of each set of unique moves
	createPGNVariant(PGNData.moves);

	// Create an array of complete PGN JSON objects each with a unique set of moves taken from PGNobjectArray
	let PGNExploded = [];
	
	// Create a new element in the array for each variant
	PGNobjectArray.reverse().forEach(variant => {
		let node = {};
		node.tags = PGNData.tags; // Copy existing tags data
		node.gameComment = PGNData.gameComment; // Copy existing comment data
		node.moves = variant; // Copy this set's unique move order
		node.messages = PGNData.messages; // Copy existing messages data
		
		PGNExploded.push(node); // Add this new node to the collection
	});

	// Return the collection back
	return PGNExploded;
}



/**
 * Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
 */
function loadPGNFile() {
	 

	resetGame();
	let PGNFile;

	const [file] = document.getElementById("openPGN").files;
	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			PGNFile = reader.result;
			try {
				parsePGN(PGNFile.trim()); // Clean up the file prior to processing

				// File is now loaded
				// Update the range of the puzzle counters to the size of the puzzleset
				$("#puzzleNumber").text("1");

				$("#puzzleNumbertotal").text(puzzleset.length);

				// Enable the start button
				setDisplayAndDisabled(["#btn_starttest"], "inline-block", false);
			} catch (err) {
				alert(
					"There is an issue with the PGN file.  Error message is as follows:\n\n" +
						err +
						"\n\nPuzzles loaded successfully before error: " +
						puzzleset.length
				);
				resetGame();
			} finally {
				// Do nothing else
			}
		},
		false
	);

	if (file) {
		reader.readAsText(file);
	}

	// Now that file is loaded, enable the ability to select options
	setCheckboxSelectability(true);

	// Clear the file value in the Open PGN control (to clear for the next file)
	$("#openPGN").val("");

	// Close the sidebar
	 $("#close_sidebar").click();
}

/**
 * PGN file parser
 *
 * @param {string} PGNData - The PGN text data to parse. Can comprise of one or more games
 */
function parsePGN(PGNData) {

	puzzleset = [];

	// Get original set of puzzles from the PGN
	let puzzlesetOriginal = PgnParser.parse(PGNData);

	// Split the variants out and add each puzzle to the final testing set.
	puzzlesetOriginal.forEach(puzzle => {
		puzzleset.push(...splitvariants(puzzle));
	});

	/*
		Pulled directly from the PGN Parser source code:
		The split function expects well formed export format strings (see [8.1 Tag pair section]
		(https://github.com/mliebelt/pgn-spec-commented/blob/main/pgn-specification.md#81-tag-pair-section), 
		statement "a single empty line follows the last tag pair"). 
		So the split function only works when tags are separated from pgn string by an empty line, 
		and the next game is separated by at least one empty line as well.
	*/

	// Set the options checkboxes if any of the special tags at the top of the PGN have a value of 1
	if (puzzleset[0].tags.PGNTrainerBothSides === "1") {
		$("#playbothsides").prop("checked", true);
	}

	if (puzzleset[0].tags.PGNTrainerOppositeSide === "1") {
		$("#playoppositeside").prop("checked", true);
	}

	if (puzzleset[0].tags.PGNTrainerRandomize === "1") {
		$("#randomizeSet").prop("checked", true);
	}

	if (puzzleset[0].tags.PGNTrainerFlipped === "1") {
		$("#flipped").prop("checked", true);
	}

	if (puzzleset[0].tags.PGNTrainerAnalysisLink === "1") {
		$("#analysisboard").prop("checked", true);
	}

	if (puzzleset[0].tags.PGNTrainerNextButton === "1") {
		$("#manualadvance").prop("checked", true);
	}

	// Make sure that both "Play both sides" and "Play opposite side" are not selected (if yes, clear both)
	confirmOnlyOneOption();
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

	$("#promote-to").selectable({
		stop() {
			$(".ui-selected", this).each(function () {
				const selectable = $("#promote-to li");
				const index = selectable.index(this);
				let promoteTo_html;
				let span;

				if (index > -1) {
					promoteTo_html = selectable[index].innerHTML;
					span = $(`<div>${promoteTo_html}</div>`).find("span");
					promoteTo = span[0].innerHTML;
				}
				promotionDialog.dialog("close");
				$(".ui-selectee").removeClass("ui-selected");
				updateBoard(false);
				//promoting = false;
			});
		},
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
});
