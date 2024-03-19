/*
* Chess-PGN-Trainer
*/

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */
/* eslint no-unused-vars: "error"*/

/* global Chess, Chessboard, PgnParser */
/* exported blankBoard, loadPGNFile, resizeBoards */

// -----------------------
// Define global variables
// -----------------------

// Board & Overall configuration-related variables
const version = '1.7.0';
let board;
let blankBoard;
let pieceTheme;
let game;
let config;
let AnalysisLink = false;

// Game & Performance variables
let moveCfg;
let moveHistory;
let puzzleset;
let errorcount;
let error;
let setcomplete;
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
$('#versionnumber').text(`version ${version}`);

// Collection of checkboxes used in the app
let checkboxlist = ['#playbothsides', '#playoppositeside', '#randomizeSet', '#flipped', '#analysisboard'];

// Collection of text elements
let messagelist = ['#messagecomplete', '#puzzlename_landscape', '#puzzlename_portrait', '#errors', '#errorRate', '#elapsedTime', '#avgTime'];

// Assign details of the board
// TODO: Figure out how to override the piece theme here instead of needing to modify the chessboardjs.css file.
// Assign theme for the piece promotion popup window
pieceTheme = './img/chesspieces/staunty/{piece}.svg';
promotionDialog = $('#promotion-dialog');

// Initial Board Configuration
config = {
	draggable: true,
	onDragStart: dragStart,
	onDrop: dropPiece,
	onSnapEnd: snapEnd,
	position: 'start',
};

/*
   ---------
   Functions
   ---------
*/

/**
 * Compare latest played move to the move in the same position as the PGN
 *
 * @returns {string}
 */
function checkAndPlayNext() {
	// Need to go this way since .moveNumber isn't working...
	if (game.history()[game.history().length - 1] === moveHistory[game.history().length - 1]) { // correct move
		
		// play next move if the "Play both sides" box is unchecked
		if (!$('#playbothsides').is(':checked')) {
			// Play the opponent's next move from the PGN
			game.move(moveHistory[game.history().length]);
		}
	} else { // wrong move

		if (error === false) { // Add one to the error count for any given puzzle
			errorcount += 1;
		}
		error = true;

		// Undo that move from the game
		game.undo();

		// Snap the bad piece back
		return 'snapback';
	}

	// Check if all the expected moves have been played
	if (game.history().length === moveHistory.length) {
		puzzlecomplete = true;

		// Check to see if this is the last puzzle
		if (increment + 1 === puzzleset.length) {
			setcomplete = true;
		}

		// Are there more puzzles to go?  If yes, load the next one in the sequence
		if (increment < puzzleset.length - 1) {
			increment += 1;
			loadPuzzle(puzzleset[PuzzleOrder[increment]]);
		}
	}

	// Stop once all the puzzles in the set are done
	if (setcomplete && puzzlecomplete) {
		// Show the stats
		showStats();

		// Hide & disable the "Start" and "Pause" buttons
		setDisplayAndDisabled(
			['#btn_starttest_landscape', '#btn_starttest_portrait',
				'#btn_pause_landscape', '#btn_pause_portrait'], 'none', true);

		// Show "Restart" button
		setDisplayAndDisabled(['#btn_restart_landscape', '#btn_restart_portrait'], 'block', false);

		// Clear the move indicator
		$('#moveturn').text('');

	}
}

/**
 * Clear all the on-screen messages
 */
function clearMessages() {

	for (messageelement of messagelist) {
		$(messageelement).text('');
	}
}

/**
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
 * Handle the start of moving a piece on the board
 *
 * @param {*} source - The source square from where the piece started
 * @param {*} piece - A chess.js game piece
 * @param {*} position - The position of the board
 * @param {*} orientation - The board orientation
 * @returns {boolean}
 */
function dragStart(source, piece, position, orientation) {
	// Only pick up pieces for the side to move
	if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		(game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	}

	// Don't allow moves if game is paused
	if (pauseflag) {
		return false;
	}

	// Only pick up pieces if the move number is odd if the player goes first or even if player is going second
	// AND the user is not playing both sides
	if (!$('#playbothsides').is(':checked')) {
		// Player is playing first
		if (!$('#playoppositeside').is(':checked') && game.history().length % 2 !== 0) {
			return false;
		}

		// Player is playing second
		if ($('#playoppositeside').is(':checked') && (game.history().length % 2 === 0 || game.history().length === 0)) {
			return false;
		}
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
		promotion: 'q',
		to: target,
	};

	move = game.move(moveCfg);

	if (move === null) {
		return 'snapback';
	}

	game.undo(); // move is ok, now we can go ahead and check for promotion

	if (piece === 'p' && ((source_rank === '7' && target_rank === '8') || (source_rank === '2' && target_rank === '1'))) {
		promoting = true;

		// Get the correct color pieces for the promotion popup
		getPieces();

		// Show the select piece promotion dialog screen
		promotionDialog.dialog({
			close: onDialogClose,
			closeOnEscape: false,
			dialogClass: 'noTitleStuff',
			draggable: false,
			height: 50,
			modal: true,
			resizable: true,
			width: 184,
		}).dialog('widget').position({
			of: $('#myBoard'),
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
	if (setcomplete && puzzlecomplete) {
		$('#moveturn').text('');
	}

	// Clear the hint if used
	$('#btn_hint_landscape').text('Hint');
	$('#btn_hint_portrait').text('Hint');
}

/**
 * Get an individual piece image
 *
 * @param {chess} piece - A chess.js game piece
 * @returns {*}
 */
function getImgSrc(piece) {
	return pieceTheme.replace('{piece}', game.turn() + piece.toLocaleUpperCase());
}

/**
 * Populate the pawn promotion popup based on the color of the current player
 */
function getPieces() {
	$('.promotion-piece-q').attr('src', getImgSrc('q'));
	$('.promotion-piece-r').attr('src', getImgSrc('r'));
	$('.promotion-piece-n').attr('src', getImgSrc('n'));
	$('.promotion-piece-b').attr('src', getImgSrc('b'));
}

/**
 * Indicate who's turn it is to move
 */
function indicateMove() {
	$('#moveturn').text('White to move');

	if (game.turn() === 'b') {
		$('#moveturn').text('Black to move');
	}
}

/**
 * Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
 */
function loadPGNFile() {
	let PGNFile;

	const [file] = document.getElementById('openPGN').files;
	const reader = new FileReader();

	resetGame();

	reader.addEventListener(
		'load',
		() => {
			PGNFile = reader.result;
			try {
				parsePGN(PGNFile.trim());  // Clean up the file prior to processing

				// File is now loaded
				// Update the range of the puzzle counters to the size of the puzzleset
				$('#puzzleNumber_landscape').text('1');
				$('#puzzleNumber_portrait').text('1');

				$('#puzzleNumbertotal_landscape').text(puzzleset.length);
				$('#puzzleNumbertotal_portrait').text(puzzleset.length);

				// Enable the start button
				setDisplayAndDisabled(['#btn_starttest_landscape', '#btn_starttest_portrait'], 'block', false);
			}
			catch (err) {
				alert('There is an issue with the PGN file.  Error message is as follows:\n\n' + err
					+ '\n\nPuzzles loaded successfully before error: ' + puzzleset.length);
				resetGame();
			}
			finally {
				// Clear the value of the file input field
				$('#openPGN').val('');
			}
		},
		false,
	);

	if (file) {
		reader.readAsText(file);
	}

	// Now that file is loaded, enable the ability to select options
	setCheckboxSelectability(true);
}

/**
 * Load the desired puzzle or position from the PGN to the screen
 *
 * @param {object} PGNPuzzle - The object representing a specific position and move sequence
 */
function loadPuzzle(PGNPuzzle) {
	// Display current puzzle number in the sequence
	$('#puzzleNumber_landscape').text(increment + 1);
	$('#puzzleNumber_portrait').text(increment + 1);

	updateProgressBar(increment, puzzleset.length);

	// Set the error flag to false for this puzzle (ie: only count 1 error per puzzle)
	error = false;
	puzzlecomplete = false;

	// Load the board position into memory
	game = new Chess(PGNPuzzle.FEN);

	// Load the moves of the PGN into memory
	PGNPuzzle.Moves.forEach(
		(move) => game.move(move.notation.notation),
	);

	// Copy the move order from the PGN into memory
	moveHistory = game.history();

	// Set the board position to the opening in the puzzle (ie: undo all steps in the PGN)
	while (game.undo() !== null) { game.undo(); }

	// Set the board to the beginning position of the puzzle
	updateBoard(false);

	// Ensure the orientation is set to match the puzzle
	// Default is white
	board.orientation('white');

	// Flip the board if Black to play
	if (game.turn() === 'b') {
		board.orientation('black');
	}

	// Flip board if "Flipped" checkbox is checked
	if ($('#flipped').is(':checked')) {
		board.flip();
	}

	// Update the status of the game in memory with the new data
	indicateMove();

	// Update the screen with the value of the PGN Event tag (if any)
	$('#puzzlename_landscape').text(PGNPuzzle.Event);
	$('#puzzlename_portrait').text(PGNPuzzle.Event);

	if ($('#analysisboard').is(':checked')) { AnalysisLink = true; } else { AnalysisLink = false; }

	// Output a link to a lichess analysis board for this puzzle if there is one (can extract FEN from there if needed)
	if (PGNPuzzle.FEN) {
		lichessFEN = PGNPuzzle.FEN.replace(/ /g, "_");
		lichessURL = '<A HREF="https://lichess.org/analysis/' + PGNPuzzle.FEN.replace(/ /g, "_") + '" target="_blank">Analysis</A>';

		if (AnalysisLink) {
			$('#puzzlename_landscape').html(PGNPuzzle.Event + "<br><center>" + lichessURL);
			$('#puzzlename_portrait').html(PGNPuzzle.Event + "<br><center>" + lichessURL);
		}
	}

	// Play the first move if player is playing second and not both sides
	if ($('#playoppositeside').is(':checked') && !$('#playbothsides').is(':checked')) {
		game.move(moveHistory[0]);
		updateBoard(true);
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
		return 'snapback';
	}
}

/**
 * Set the promotion value in the move config and make the move
 */
function onDialogClose() {
	moveCfg.promotion = promoteTo;
	makeMove(game, moveCfg);
	checkAndPlayNext();
}

/**
 * PGN file parser
 *
 * @param {string} PGNData - The PGN text data to parse. Can comprise of one or more games
 */
function parsePGN(PGNData) {
	const splitGames = (string) => PgnParser.split(string, { startRule: 'games' });
	const games = splitGames(PGNData);

	puzzleset = [];

	games.forEach(
		(game) => {
			const { tags } = PgnParser.parse(game.tags, { startRule: 'tags' });
			const { moves } = PgnParser.parse(game.pgn, { startRule: 'game' });

			// Set the options checkboxes if any of the special tags have a value of 1
			if (tags.PGNTrainerBothSides === '1') { $("#playbothsides").prop("checked", true); }
			if (tags.PGNTrainerOppositeSide === '1') { $("#playoppositeside").prop("checked", true); }
			if (tags.PGNTrainerRandomize === '1') { $("#randomizeSet").prop("checked", true); }
			if (tags.PGNTrainerFlipped === '1') { $("#flipped").prop("checked", true); }
			if (tags.PGNTrainerAnalysisLink === '1') { $("#analysisboard").prop("checked", true); }

			// Make sure that both "Play both sides" and "Play opposite side" are not selected (if yes, clear both)
			confirmOnlyOneOption();

			const puzzle = {};
			puzzle.Event = (tags.Event);
			puzzle.FEN = (tags.FEN);
			puzzle.PGN = (game.pgn);
			puzzle.Moves = moves;

			puzzleset.push(puzzle);
		},
	);
}

/**
 * Handle when a user presses the "pause" button
 */
function pauseGame() {
	// Start a new counter (to then subtract from overall total)
	$(window).trigger('resize');
	switch (pauseflag) {
	case false:
		$('#btn_pause_landscape').text('Resume');
		$('#btn_pause_portrait').text('Resume');
		pauseflag = true;
		PauseStartDateTime = new Date();

		// hide the board
		$('#myBoard').css('display', 'none');
		$('#blankBoard').css('display', 'block');

		// Remove focus on the pause/resume button
		$('#btn_pause_landscape').blur();
		$('#btn_pause_portrait').blur();
		break;
	case true:
		$('#btn_pause_landscape').text('Pause');
		$('#btn_pause_portrait').text('Pause');
		pauseflag = false;
		PauseendDateTime = new Date();

		// Keep running total of paused time
		pauseDateTimeTotal += (PauseendDateTime - PauseStartDateTime);

		// show the board
		$('#myBoard').css('display', 'block');
		$('#blankBoard').css('display', 'none');

		// Remove focus on the pause/resume button 
		$('#btn_pause_landscape').blur();
		$('#btn_pause_portrait').blur();
		break;
	}
	$(window).trigger('resize');
}

/**
 * Reset everything in order to start a new testing session
 */
function resetGame() {
	// Reset the current game in memory
	board = null;
	game = new Chess();
	moveHistory = [];
	puzzleset = [];
	errorcount = 0;
	pauseDateTimeTotal = 0;
	error = false;
	setcomplete = false;
	AnalysisLink = false;

	// Create the boards
	board = new Chessboard('myBoard', config);
	blankBoard = new Chessboard('blankBoard', { showNotation: false });

	// Resize the board to the current available space
	$(window).trigger('resize');

	// Set the counters back to zero
	$('#puzzleNumber_landscape').text('0');
	$('#puzzleNumber_portrait').text('0');
	$('#puzzleNumbertotal_landscape').text('0');
	$('#puzzleNumbertotal_portrait').text('0');

	// Show Start button and hide "Pause" and "Restart" buttons
	setDisplayAndDisabled(['#btn_starttest_landscape', '#btn_starttest_portrait'], 'block', true);
	setDisplayAndDisabled(
		['#btn_pause_landscape', '#btn_pause_portrait',
			'#btn_restart_landscape', '#btn_restart_portrait'], 'none', false);

	// Hide & disable the "Hint" and the "Show Results" buttons
	setDisplayAndDisabled(
		['#btn_hint_landscape', '#btn_hint_portrait', '#btn_showresults'], 'none', true);

	// Show the full board (in case the reset happened during a pause)
	$('#myBoard').css('display', 'block');
	$('#blankBoard').css('display', 'none');

	// Reset the progress bar
	$('#progressbar_landscape').width("0%");
	$('#progressbar_landscape').text("0%");

	$('#progressbar_portrait').width("0%");
	$('#progressbar_portrait').text("0%");

	// Disnable options checkboxes
	setCheckboxSelectability(false);

	// Clear the checkboxes
	for (checkboxelement of checkboxlist) {
		$(checkboxelement).prop('checked', false);
	}

	// Remove focus on the reset button
	$('#btn_reset').blur();

	// Clear any prior results/statistics
	clearMessages();

	// Clear the move indicator
	$('#moveturn').text('');

	// Close hover
	w3_close();
	$(window).trigger('resize');
}

/**
 * Resize both boards to available space
 */
function resizeBoards() {
	board.resize();
	blankBoard.resize();
}

/**
 * Either turn on or off the ability to select options (ie: don't allow changes while in a game)
 *
 * @param {boolean} state - Set to true to enable the checkboxes. Set to false to disable the checkboxes.
 */
function setCheckboxSelectability(state) {

	for (checkboxelement of checkboxlist) {
		if (state) {
			if ($(checkboxelement).prop('disabled')) {
				$(checkboxelement).removeAttr('disabled');
				confirmOnlyOneOption();
			}
		} else {
			$(checkboxelement).attr('disabled', true);
		}
	}
}

/**
 * Set the CSS display and disabled properties of a given element
 * 
 * @param {array} listofElements - Array of controls to set in JQuery naming format (ie: prefaced with #)
 * @param {boolean} visible - Set to true to make the control visible. Set to false to hide the control.
 * @param {boolean} disabled - Set to true to disable the control. Set to false to enable the control.
 */
function setDisplayAndDisabled(listofElements, visible, disabled) {

	for (elementName of listofElements) {
		// Set the visibility of the element
		if (visible !== undefined) {
			$(elementName).css('display', visible);
		}

		// Set the status of the disabled property of the element
		if (disabled !== undefined) {
			$(elementName).prop('disabled', disabled);
		}
	}

}

/**
 * Show the hint
 */
function showHint() {

	// Change the text of the button to the correct move
	$('#btn_hint_landscape').text(moveHistory[game.history().length]);
	$('#btn_hint_portrait').text(moveHistory[game.history().length]);

	// Set error flag for this puzzle since hint was used.
	if (error === false) {
		errorcount += 1;
	}
	error = true;
}

/**
 * Show the final stats after finishing all the puzzles in the set
 */
function showStats() {
	const endDateTime = new Date();
	const ElapsedTimeSeconds = (endDateTime - startDateTime - pauseDateTimeTotal) / 1000; // Subtracting the paused time from total elapsed time
	const ElapsedTimehhmmss = new Date(ElapsedTimeSeconds * 1000).toISOString().slice(11, 19);
	const AvgTimeSeconds = ElapsedTimeSeconds / puzzleset.length;
	const AvgTimehhmmss = new Date(AvgTimeSeconds * 1000).toISOString().slice(11, 19);
	const ErrorRate = (errorcount / puzzleset.length);
	const ErrorRate1Dec = ErrorRate.toFixed(3) * 100;

	updateProgressBar(1, 1);

	// Show & enable "Show Results" button
	setDisplayAndDisabled(['#btn_showresults'], 'block', false);

	// Hide & disable the "hint" button
	setDisplayAndDisabled(['#btn_hint_landscape', '#btn_hint_portrait'], 'none', true);

	// Update modal with the details
	$('#messagecomplete').html('<h2>Set Complete</h2>');
	$('#elapsedTime').text(`Elapsed time (hh:mm:ss): ${ElapsedTimehhmmss}`);
	$('#avgTime').text(`Average time/puzzle (hh:mm:ss): ${AvgTimehhmmss}`);
	$('#errors').text(`Number of errors: ${errorcount}`);
	$('#errorRate').text(`Error Rate: ${ErrorRate1Dec.toFixed(1)}%`);

	// Display the modal
	showresults();

	// Re-enable options checkboxes
	setCheckboxSelectability(true);
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
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex],
		];
	}

	return array;
}

/**
 * Update the board position after the piece snap for castling, en passant, pawn promotion
 */
function snapEnd() {
	// Update instantly if the puzzle is done
	if (game.history().length === moveHistory.length) {
		updateBoard(false);
	} else {
		updateBoard(true);
	}
}

/**
 * Starts the test and timer
 */
function startTest() {
	// Close hover
	w3_close();
	
	// Check to make sure that a PGN File was loaded
	if (puzzleset.length === 0) {
		return;
	}

	// Hide "Start", "Restart" & "Show Results" buttons
	setDisplayAndDisabled(
		['#btn_starttest_landscape', '#btn_starttest_portrait',
			'#btn_restart_landscape', '#btn_restart_portrait', '#btn_showresults'], 'none');

	// Show & enable the "Hint" and "Pause" buttons
	setDisplayAndDisabled(
		['#btn_pause_landscape', '#btn_pause_portrait',
			'#btn_hint_landscape', '#btn_hint_portrait'], 'block', false);

	// Disable changing options
	setCheckboxSelectability(false);

	// Clear any messages
	clearMessages();

	// Load first puzzle and start counting for errors (for now...)
	errorcount = 0;

	// Get current date/time
	startDateTime = new Date();
	pauseDateTimeTotal = 0;
	increment = 0;

	// Neat bit here from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
	const arrayRange = (start, stop, step) => Array.from(
		{ length: (stop - start) / step + 1 },
		(value, index) => start + index * step,
	);

	// Shuffle the set if the box is checked
	if ($('#randomizeSet').is(':checked')) {
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
 * Update the on-screen board with the current status of the game
 *
 * @param {boolean} animate - Set to True to animate the pieces while setting up the position.  
 * 							  Setting to false sets the pieces instantly.
 */
function updateBoard(animate) {
	board.position(game.fen(), animate);
}

/**
 * Updates the progres bar on the screen
 *
 * @param {int} partial_value - The number of completed puzzles (numerator)
 * @param {int} total_value - The total number of puzzles (denominator)
 */
function updateProgressBar(partial_value, total_value) {
	// Do the math
	const progress = Math.round((partial_value / total_value) * 100);

	// Show the result
	let progresspercent = progress + "%";
	$('#progressbar_landscape').width(progresspercent);
	$('#progressbar_landscape').text(progresspercent);

	$('#progressbar_portrait').width(progresspercent);
	$('#progressbar_portrait').text(progresspercent);
}

/**
 * Assign actions to the buttons
 */
$(() => {

	// Buttons
	$('#openPGN_button').click(() => {
		$('#openPGN').click();
	});

	$('#btn_reset').on('click', resetGame);

	$('#btn_showresults').on('click', showresults);

	$('#btn_hint_landscape').on('click', showHint);
	$('#btn_hint_portrait').on('click', showHint);

	$('#btn_starttest_landscape').on('click', startTest);
	$('#btn_starttest_portrait').on('click', startTest);

	$('#btn_restart_landscape').on('click', startTest);
	$('#btn_restart_portrait').on('click', startTest);

	$('#btn_pause_landscape').on('click', pauseGame);
	$('#btn_pause_portrait').on('click', pauseGame);

	$('#promote-to').selectable({
		stop() {
			$('.ui-selected', this).each(function () {
				const selectable = $('#promote-to li');
				const index = selectable.index(this);
				let promoteTo_html;
				let span;

				if (index > -1) {
					promoteTo_html = selectable[index].innerHTML;
					span = $(`<div>${promoteTo_html}</div>`).find('span');
					promoteTo = span[0].innerHTML;
				}
				promotionDialog.dialog('close');
				$('.ui-selectee').removeClass('ui-selected');
				updateBoard(false);
				promoting = false;
			});
		},
	});
});
