/*
* Chess-PGN-Trainer
*/

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */
/* eslint no-unused-vars: "error"*/

/* global Chess, Chessboard, PgnParser */
/* exported blankboard, loadPGNFile */

// -----------------------
// Define global variables
// -----------------------

// Board & Overall configuration-related variables
const version = '1.4.1';
let board;
let blankboard;
let pieceTheme;
let game;
let config;

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

// Title of the app
$('#Title').text(`Chess PGN Trainer ${version}`);

// Assign details of the board
pieceTheme = './img/chesspieces/wikipedia/{piece}.png';
promotionDialog = $('#promotion-dialog');

// Initial Board Configuration
config = {
	draggable: true,
	onDragStart: DragStart,
	onDrop: DropPiece,
	onSnapEnd: SnapEnd,
	position: 'start',
};

/*
   ---------
   Functions
   ---------
*/

/**
 * Handle the start of moving a piece on the board
 *
 * @param {*} piece
 * @returns {boolean}
 */
function DragStart(source, piece, position, orientation) {
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
 * Show the final stats after finishing all the puzzles in the set
 */
function showstats() {
	const endDateTime = new Date();
	const ElapsedTimeSeconds = (endDateTime - startDateTime - pauseDateTimeTotal) / 1000; // Subtracting the paused time from total elapsed time
	const ElapsedTimehhmmss = new Date(ElapsedTimeSeconds * 1000).toISOString().slice(11, 19);
	const AvgTimeSeconds = ElapsedTimeSeconds / puzzleset.length;
	const AvgTimehhmmss = new Date(AvgTimeSeconds * 1000).toISOString().slice(11, 19);
	const ErrorRate = (errorcount / puzzleset.length);
	const ErrorRate1Dec = ErrorRate.toFixed(3) * 100;

	updateprogressbar(1, 1);

	$('#messagecomplete').html('<h2>Set Complete</h2>');

	$('#elapsedTime').text(`Elapsed time (hh:mm:ss): ${ElapsedTimehhmmss}`);
	$('#avgTime').text(`Average time/puzzle (hh:mm:ss): ${AvgTimehhmmss}`);
	$('#errors').text(`Number of errors: ${errorcount}`);
	$('#errorRate').text(`Error Rate: ${ErrorRate1Dec.toFixed(1)}%`);

	// Re-enable options checkboxes
	setCheckboxSelectability(true);
}

/**
 * Compare latest played move to the move in the same position as the PGN
 *
 * @returns {string}
 */
function checkandplaynext() {
	// Need to go this way since .moveNumber isn't working...
	if (game.history()[game.history().length - 1] === moveHistory[game.history().length - 1]) {
		// correct move

		// play next move if the "Play both sides" box is unchecked
		if (!$('#playbothsides').is(':checked')) {
			// Play the opponent's next move from the PGN
			game.move(moveHistory[game.history().length]);
		}
	} else {
		// wrong move

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
		showstats();

		// Disable the start button
		$('#btn_starttest').prop('disabled', true);
		$('#btn_pause').prop('disabled', true);

		// Hide Pause button and show "Restart" button
		$('#btn_starttest').css('display', 'none');
		$('#btn_pause').css('display', 'none');
		$('#btn_restart').css('display', 'block');
	}
}

/**
 * Update the on-screen board with the current status of the game
 *
 * @param {Chessboard} board - The chessboard.js object
 */
function updateBoard(board) {
	board.position(game.fen(), false);
	promoting = false;
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
 * Description placeholder
 *
 * @param {*} source
 * @param {*} target
 * @returns {string}
 */
function DropPiece(source, target) {
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
	checkandplaynext();

	// Update the color of the dot indicating whose turn it is to play
	updatedotcolor();
}

/**
 * Set the promotion value in the move config and make the move
 */
function onDialogClose() {
	moveCfg.promotion = promoteTo;
	makeMove(game, moveCfg);
	checkandplaynext();
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
 * Update the board position after the piece snap for castling, en passant, pawn promotion
 */
function SnapEnd() {
	board.position(game.fen());
	updateBoard(board);
}

/**
 * Activate the dot to correspond with the player to move (based on game) and orientation of the board
 */
function updatedotcolor() {
	if (board.orientation() === 'white') {
		$('#topmove').removeClass('dotWHITE').addClass('dotBLACK');
		$('#bottommove').removeClass('dotBLACK').addClass('dotWHITE');

		if (game.turn() === 'w') {
			$('#topmove').css('visibility', 'hidden');
			$('#bottommove').css('visibility', 'visible');
		} else {
			$('#topmove').css('visibility', 'visible');
			$('#bottommove').css('visibility', 'hidden');
		}
	} else {
		// Swap position of dots if board is flipped
		$('#topmove').removeClass('dotBLACK').addClass('dotWHITE');
		$('#bottommove').removeClass('dotWHITE').addClass('dotBLACK');

		if (game.turn() === 'b') {
			$('#topmove').css('visibility', 'hidden');
			$('#bottommove').css('visibility', 'visible');
		} else {
			$('#topmove').css('visibility', 'visible');
			$('#bottommove').css('visibility', 'hidden');
		}
	}
}

/**
 * Flip the board
 */
function flipboard() {
	board.flip();
	updatedotcolor();
}

/**
 * PGN file parser
 *
 * @param {string} PGNData - The PGN text data to parse. Can comprise of one or more games
 */
function parsepgn(PGNData) {
	const splitGames = (string) => PgnParser.split(string, { startRule: 'games' });
	const games = splitGames(PGNData);

	puzzleset = [];

	games.forEach(
		(game) => {
			const { tags } = PgnParser.parse(game.tags, { startRule: 'tags' });
			const { moves } = PgnParser.parse(game.pgn, { startRule: 'game' });

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
 * Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
 */
function loadPGNFile() {
	let PGNFile;

	const [file] = document.getElementById('openPGN').files;
	const reader = new FileReader();

	resetgame();

	reader.addEventListener(
		'load',
		() => {
			PGNFile = reader.result;
			parsepgn(PGNFile);

			// File is now loaded
			// Update the range of the puzzle counters to the size of the puzzleset
			$('#puzzleNumber').text('1');
			$('#puzzleNumbertotal').text(puzzleset.length);

			// Enable the start button
			$('#btn_starttest').prop('disabled', false);

			// Clear the value of the file input field
			$('#openPGN').val('');
		},

		false,
	);

	if (file) {
		reader.readAsText(file);
	}
}

/**
 * Either turn on or off the ability to select options (ie: don't allow changes while in a game)
 *
 * @param {boolean} state - Set to true to enable the checkboxes. Set to false to disable the checkboxes.
 */
function setCheckboxSelectability(state) {
	if (state) {
		if ($('#playbothsides').prop('disabled')) {
			$('#playbothsides').removeAttr('disabled');
		}
		if ($('#playoppositeside').prop('disabled')) {
			$('#playoppositeside').removeAttr('disabled');
		}
		if ($('#randomizeSet').prop('disabled')) {
			$('#randomizeSet').removeAttr('disabled');
		}
		if ($('#flipped').prop('disabled')) {
			$('#flipped').removeAttr('disabled');
		}
	} else {
		$('#playbothsides').attr('disabled', true);
		$('#playoppositeside').attr('disabled', true);
		$('#randomizeSet').attr('disabled', true);
		$('#flipped').attr('disabled', true);
	}
}

/**
 * Updates the progres bar on the screen
 *
 * @param {int} partial_value - The number of completed puzzles (numerator)
 * @param {int} total_value - The total number of puzzles (denominator)
 */
function updateprogressbar(partial_value, total_value) {
	// Do the math
	const progress = Math.round((partial_value / total_value) * 100);

	// Show the result
	$('#progressbar')
		.progressbar({ value: progress })
		.children('.ui-progressbar-value')
		.html(`${progress}%`)
		.css('display', 'block')
		.css('background', '#b9c7ff');
}

/**
 * Load the desired puzzle or position from the PGN to the screen
 *
 * @param {object} PGNPuzzle - The object representing a specific position and move sequence
 */
function loadPuzzle(PGNPuzzle) {
	// Display current puzzle number in the sequence
	$('#puzzleNumber').text(increment + 1);
	updateprogressbar(increment, puzzleset.length);

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
	board.position(game.fen(), false);

	// Ensure the orientation is set to match the puzzle
	// Default is white
	board.orientation('white');

	// Flip the board if Black to play
	if (game.turn() === 'b') {
		board.orientation('black');
	}

	// Flip board if Flipped checkbox is checked
	if ($('#flipped').is(':checked')) {
		flipboard();
	}

	// Update the status of the game in memory with the new data
	updatedotcolor();

	// Update the screen with the value of the PGN Event tag (if any)
	$('#puzzlename').text(PGNPuzzle.Event);

	// Play the first move if player is playing second and not both sides
	if ($('#playoppositeside').is(':checked') && !$('#playbothsides').is(':checked')) {
		game.move(moveHistory[0]);
		board.position(game.fen(), true);
	}
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
 * Handle when a user presses the "pause" button
 */
function Pause() {
	// Start a new counter (to then subtract from overall total)

	switch ($('#btn_pause').text()) {
	case 'Pause':
		$('#btn_pause').text('Resume');
		pauseflag = true;
		PauseStartDateTime = new Date();

		// hide the board
		$('#myBoard').css('display', 'none');
		$('#blankboard').css('display', 'block');
		break;
	case 'Resume':
		$('#btn_pause').text('Pause');
		pauseflag = false;
		PauseendDateTime = new Date();

		// Keep running total of paused time
		pauseDateTimeTotal += (PauseendDateTime - PauseStartDateTime);

		// show the board
		$('#myBoard').css('display', 'block');
		$('#blankboard').css('display', 'none');

		break;
	}
}

/**
 * Starts the test and timer
 */
function startTest() {
	// Check to make sure that a PGN File was loaded
	if (puzzleset.length === 0) {
		return;
	}

	// Hide Start & Restart buttons and show "Pause" button
	$('#btn_starttest').css('display', 'none');
	$('#btn_restart').css('display', 'none');
	$('#btn_pause').css('display', 'block');
	$('#btn_pause').prop('disabled', false);

	// Disable changing options
	setCheckboxSelectability(false);

	// Clear any messages
	clearmessages();

	// Load first puzzle and start counting for errors (for now...)
	errorcount = 0;

	// Get current date/time
	startDateTime = new Date();
	increment = 0;

	// Neat bit here from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
	const arrayRange = (start, stop, step) => Array.from(
		{ length: (stop - start) / step + 1 },
		(value, index) => start + index * step,
	);

	// Generate numbers between 1 and the number of puzzles in the PGN
	PuzzleOrder = arrayRange(0, puzzleset.length - 1, 1);

	// Shuffle the set if the box is checked
	if ($('#randomizeSet').is(':checked')) {
		shuffle(PuzzleOrder);
	}

	// Now just need to send the desired puzzle to the board.
	loadPuzzle(puzzleset[PuzzleOrder[increment]]);
}

/**
 * Clear all the on-screen messages
 */
function clearmessages() {
	$('#messagecomplete').text('');
	$('#puzzlename').text('');
	$('#errors').text('');
	$('#errorRate').text('');
	$('#elapsedTime').text('');
	$('#avgTime').text('');
}

/**
 * Reset everything in order to start a new testing session
 */
function resetgame() {
	// Reset the current game in memory
	board = null;
	game = new Chess();
	moveHistory = [];
	puzzleset = [];
	errorcount = 0;
	pauseDateTimeTotal = 0;
	error = false;
	setcomplete = false;

	// Create the boards
	board = new Chessboard('myBoard', config);
	blankboard = new Chessboard('blankboard');

	// Set the counters back to zero
	$('#puzzleNumber').text('0');
	$('#puzzleNumbertotal').text('0');

	// Hide Start button and show "Pause" button
	$('#btn_pause').css('display', 'none');
	$('#btn_pause').prop('disabled', false);

	$('#btn_restart').css('display', 'none');
	$('#btn_restart').prop('disabled', false);

	$('#btn_starttest').css('display', 'block');
	$('#btn_starttest').prop('disabled', true);

	// show the full board (in case the reset happened during a pause)
	$('#myBoard').css('display', 'block');
	$('#blankboard').css('display', 'none');

	// Reset the progress bar
	$('#progressbar').progressbar({ value: 0 });

	// Re-enable options checkboxes
	setCheckboxSelectability(true);

	// Clear the checkboxes
	$('#playbothsides').prop('checked', false);
	$('#playoppositeside').prop('checked', false);
	$('#randomizeSet').prop('checked', false);
	$('#flipped').prop('checked', false);

	// Clear any prior results/statistics
	clearmessages();

	// Reset the dot color
	updatedotcolor();
}

// Assign actions to the buttons
$(() => {
	// Buttons
	$('#openPGN_button').click((e) => {
		$('#openPGN').click();
	});
	$('#btn_reset').on('click', resetgame);
	$('#btn_starttest').on('click', startTest);
	$('#btn_restart').on('click', startTest);
	$('#btn_pause').on('click', Pause);

	// Pawn Promotion
	$('.promotion-piece-q').attr('src', getImgSrc('q'));
	$('.promotion-piece-r').attr('src', getImgSrc('r'));
	$('.promotion-piece-n').attr('src', getImgSrc('n'));
	$('.promotion-piece-b').attr('src', getImgSrc('b'));

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
				updateBoard(board);
			});
		},
	});

	// Add Hint button function (in case you get stuck, press and hold down the spacebar)
	$(document).keydown((e) => {
		if (e.keyCode === 32) {
			// Only display hint when in a puzzle
			if (moveHistory.length > 0) {
				$('#messagecomplete').text(moveHistory[game.history().length]);

				// Set error flag for this puzzle since hint was used.
				if (error === false) {
					errorcount += 1;
				}
				error = true;
			}
		}
	});

	$(document).keyup((e) => {
		if (e.keyCode === 32) {
			$('#messagecomplete').text('');
		}
	});
});
