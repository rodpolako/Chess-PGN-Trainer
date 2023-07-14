/*
Chess-PGN-Trainer

Online tool that opens chess PGN files and allows the user to practice the moves.

This basic tool is to help with drilling a set group of puzzles but with any appropriately configured PGN file. 

PGN Files need only three parts:

FEN - The representation of the board and associated information
The moves for both white and black.
(Optional) the "Event" tag so that the puzzle has a label

Here is an example PGN created using the analysis board from chess.com with a really basic endgame that was just saved to a file.

[Event "Example 1"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "1-0"]
[SetUp "1"]
[FEN "7k/8/8/3Q1K2/8/8/8/8 w - - 0 1"]

1. Kf6 Kh7 2. Qf7+ Kh8 3. Qg7# 1-0

Use the "Open PGN file" button to open this file and you can practice this puzzle.

The PGN file can have any number of puzzles so you can work through a set in one shot.

This tool has a couple of other features that you might like:

* Auto move to next puzzle - Automatically advances to the next puzzle upon completion of the current one
* Play both sides - Allows the player to play both sides of the puzzle
* Randomize - Presents the puzzles in the set in a random order
* Flipped - Allows you to play the puzzle from the other side of the board. May help to develop sense when 
a given tactic is being used on you.

Once a test group is completed, tool displays the following performance information:

- Number of errors
- Time to completion
- Average time per puzzle (Calculated)
- Error rate (Calculated)

*/



// Define global variables
var board, game, moveHistory, puzzleset, errorcount, error, setcomplete;
var piece_theme, promote_to, promoting, promotion_dialog;

var startDateTime = new Date();
var puzzlecomplete = false;
var increment = 0;
var PuzzleOrder = [];

piece_theme = './img/chesspieces/wikipedia/{piece}.png';
promotion_dialog = $('#promotion-dialog');
promoting = false;


// Initial Board Configuration
var config = {
	draggable: true,
	position: 'start',
	onDragStart: onDragStart,
	onDrop: onDrop,
	onSnapEnd: onSnapEnd
};


function onDragStart(source, piece, position, orientation) {

	// only pick up pieces for the side to move
	if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		(game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false
	}

	// only pick up pieces if the move number is odd (player always goes first) and the user is not playing both sides
	if (!$("#playbothsides").is(':checked')) {
		if (game.history().length % 2 !== 0) {
			return false
		}
	}

	// do not pick up pieces if the puzzle is complete (ie: all the moves of the PGN have been played)
	if (game.history().length === moveHistory.length) {
		return false
	}
}

function showstats() {

	var endDateTime = new Date();
	var ElapsedTimeSeconds = (endDateTime - startDateTime) / 1000
	var ElapsedTimehhmmss = new Date(ElapsedTimeSeconds * 1000).toISOString().slice(11, 19)
	var AvgTimeSeconds = ElapsedTimeSeconds / puzzleset.length
	var AvgTimehhmmss = new Date(AvgTimeSeconds * 1000).toISOString().slice(11, 19)

	$('#messagecomplete').html('<h2>Set Complete</h2>')

	$('#elapsedTime').text('Elapsed time (hh:mm:ss): ' + ElapsedTimehhmmss)
	$('#avgTime').text('Average time/puzzle (hh:mm:ss): ' + AvgTimehhmmss)
	$('#errors').text('Number of errors: ' + errorcount)
	$('#errorRate').text('Error Rate: ' + ((errorcount / puzzleset.length).toFixed(3) * 100).toFixed(1) + '%')

}

function checkandplaynext() {

	// Compare latest played move to the move in the same place as the PGN
	// Need to go this way since .moveNumber isn't working...

	if (game.history()[game.history().length - 1] === moveHistory[game.history().length - 1]) {

		// correct move

		// play next move if the "Play both sides" box is unchecked
		if (!$("#playbothsides").is(':checked')) {

			// Play the opponent's next move from the PGN
			game.move(moveHistory[game.history().length])
		}

	} else {
		// wrong move

		if (error === false) { // Add one to the error count for any given puzzle
			++errorcount;
		}
		error = true;

		// Undo that move from the game
		game.undo();

		// Snap the bad piece back
		return 'snapback'
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
			++increment
			loadPuzzle(puzzleset[PuzzleOrder[increment]])
		}

	}

	// Stop once all the puzzles in the set are done
	if (setcomplete & puzzlecomplete) {

		// Show the stats
		showstats();

		// Disable the start button
		$('#btn_starttest').prop('disabled', true);
	}

}

function updateBoard(board) {
	board.position(game.fen(), false);
	promoting = false;
}

function getImgSrc(piece) {
	return piece_theme.replace('{piece}', game.turn() + piece.toLocaleUpperCase());
}

function onDrop(source, target) {

	// First attempt at move
	// see if the move is legal
	move_cfg = {
		from: source,
		to: target,
		promotion: 'q'
	};

	var move = game.move(move_cfg);

	if (move === null) {
		return 'snapback';
	} else {
		game.undo(); // move is ok, now we can go ahead and check for promotion
	}

	// is it a promotion?
	var source_rank = source.substring(2, 1);
	var target_rank = target.substring(2, 1);
	var piece = game.get(source).type;

	if (piece === 'p' &&
		((source_rank === '7' && target_rank === '8') || (source_rank === '2' && target_rank === '1'))) {
		promoting = true;

		//show the select piece to promote to dialog
		promotion_dialog.dialog({
			modal: true,
			height: 50,
			width: 184,
			resizable: true,
			draggable: false,
			close: onDialogClose,
			closeOnEscape: false,
			dialogClass: 'noTitleStuff'
		}).dialog('widget').position({
			of: $('#myBoard'),
			//my: 'center center',
			//at: 'center center',   //Maybe add code to position near the pawn being promoted?
		});
		// the actual move is made after the piece to promote to
		// has been selected, in the stop event of the promotion piece selectable
		return;

	}

	// no promotion, go ahead and move
	makeMove(game, move_cfg);

	// Check if the move played is the expected one and play the next one if it was
	checkandplaynext()

	// Update the color of the dot indicating whose turn it is to play
	updatedotcolor();
}

var onDialogClose = function () {

	// Set the promotion value in the move config and make the move
	move_cfg.promotion = promote_to;
	makeMove(game, move_cfg);
	checkandplaynext()
}

function makeMove(game, cfg) {
	// see if the move is legal
	var move = game.move(cfg);

	// illegal move
	if (move === null) return 'snapback';
}

function onSnapEnd() {
	// update the board position after the piece snap for castling, en passant, pawn promotion
	board.position(game.fen())
	updateBoard(board);
}


function updatedotcolor() {

	// Activate the dot to correspond with the player to move (based on game) and orientation of the board

	if (board.orientation() === 'white') {

		$('#topmove').removeClass('dotWHITE').addClass('dotBLACK');
		$('#bottommove').removeClass('dotBLACK').addClass('dotWHITE');

		if (game.turn() === 'w') {
			$('#topmove').css("visibility", "hidden");
			$('#bottommove').css("visibility", "visible");
		} else {
			$('#topmove').css("visibility", "visible");
			$('#bottommove').css("visibility", "hidden");
		}

	} else {

		// Swap position of dots if board is flipped
		$('#topmove').removeClass('dotBLACK').addClass('dotWHITE');
		$('#bottommove').removeClass('dotWHITE').addClass('dotBLACK');

		if (game.turn() === 'b') {
			$('#topmove').css("visibility", "hidden");
			$('#bottommove').css("visibility", "visible");
		} else {
			$('#topmove').css("visibility", "visible");
			$('#bottommove').css("visibility", "hidden");
		}
	}

}


function flipboard() {
	board.flip()
	updatedotcolor();
}


// PGN file parser
function parsepgn(PGNData) {

	const splitGames = (string) => PgnParser.split(string, { startRule: "games" })
	const games = splitGames(PGNData)

	puzzleset = [];

	games.forEach((game) => {
		const tags = PgnParser.parse(game.tags, { startRule: 'tags' }).tags
		let moves = PgnParser.parse(game.pgn, { startRule: "game" }).moves;

		var puzzle = {};
		puzzle.Event = (tags.Event)
		puzzle.FEN = (tags.FEN)
		puzzle.PGN = (game.pgn)
		puzzle.Moves = moves

		puzzleset.push(puzzle)
	})

	// File is now loaded
	// Update the range of the puzzle counters to the size of the puzzleset
	$('#puzzleNumber').text('1');
	$('#puzzleNumbertotal').text(puzzleset.length);

	// Enable the start button
	$('#btn_starttest').prop('disabled', false);

}


// Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
function loadPGNFile() {

	resetgame();

	var PGNFile;

	const [file] = document.getElementById('openPGN').files
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		PGNFile = reader.result;
		parsepgn(PGNFile);
	}, false,);

	if (file) { reader.readAsText(file); }

}



function loadPuzzle(PGNPuzzle) {

	// Display current puzzle number in the sequence
	$('#puzzleNumber').text(increment + 1);

	// Set the error flag to false for this puzzle (ie: only count 1 error per puzzle)
	error = false;
	puzzlecomplete = false;

	// Load the board position into memory
	game = Chess(PGNPuzzle.FEN)

	// Load the moves of the PGN into memory
	PGNPuzzle.Moves.forEach((move) => {
		game.move(move.notation.notation)
	})

	// Copy the move order from the PGN into memory
	moveHistory = game.history()

	// Set the board position to the opening in the puzzle (ie: undo all steps in the PGN)
	while (game.undo() !== null) { game.undo(); }

	// Set the board to the beginning position of the puzzle
	board.position(game.fen(), false)

	// Ensure the orientation is set to match the puzzle
	// Default is white
	board.orientation('white')

	// Flip the board if Black to play
	if (game.turn() === 'b') {
		board.orientation('black')
	}

	// Flip board if Flipped checkbox is checked
	if ($("#flipped").is(':checked')) {
		flipboard()
	}

	// Update the status of the game in memory with the new data
	updatedotcolor();

	// Update the screen with the value of the PGN Event tag (if any)
	$('#puzzlename').text(PGNPuzzle.Event)

	// Show the answers in the console (ie: hint mode)
	console.clear()
	console.log('Correct moves for this puzzle: ', moveHistory)

}

// Credit for this function goes to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}


function startTest() {

	// Check to make sure that a PGN File was loaded
	if (puzzleset.length === 0) {
		return
	}

	// Load first puzzle and start counting for errors (for now...)
	errorcount = 0;

	// Get current date/time
	startDateTime = new Date();
	increment = 0;

	// Neat bit here from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
	const arrayRange = (start, stop, step) =>
		Array.from(
			{ length: (stop - start) / step + 1 },
			(value, index) => start + index * step
		);

	// Generate numbers between 1 and the number of puzzles in the PGN
	PuzzleOrder = arrayRange(0, puzzleset.length - 1, 1);

	// Shuffle the set if the box is checked
	if ($("#randomizeSet").is(':checked')) {
		shuffle(PuzzleOrder);
	}

	// Now just need to send the desired puzzle to the board.
	loadPuzzle(puzzleset[PuzzleOrder[increment]])

}


function resetgame() {
	// Reset the current game in memory

	board = null
	game = new Chess()
	moveHistory = []

	puzzleset = [];
	errorcount = 0;
	error = false;
	setcomplete = false;

	// Create the board
	board = Chessboard('myBoard', config);

	$('#puzzleNumber').text('0');
	$('#puzzleNumbertotal').text('0');

	$('#btn_starttest').prop('disabled', true);

	$('#messagecomplete').text('')
	$('#puzzlename').text('')
	$('#errors').text('')
	$('#errorRate').text('')
	$('#elapsedTime').text('')
	$('#avgTime').text('')

	updatedotcolor()
}


// Assign actions to the buttons
$(function () {
	// Buttons 
	$('#openPGN_button').click(function (e) { $('#openPGN').click(); });
	$('#btn_reset').on('click', resetgame);
	$('#btn_starttest').on('click', startTest);

	// Pawn Promotion
	$('.promotion-piece-q').attr('src', getImgSrc('q'));
	$('.promotion-piece-r').attr('src', getImgSrc('r'));
	$('.promotion-piece-n').attr('src', getImgSrc('n'));
	$('.promotion-piece-b').attr('src', getImgSrc('b'));

	$("#promote-to").selectable({
		stop: function () {
			$(".ui-selected", this).each(function () {
				var selectable = $('#promote-to li');
				var index = selectable.index(this);
				if (index > -1) {
					var promote_to_html = selectable[index].innerHTML;
					var span = $('<div>' + promote_to_html + '</div>').find('span');
					promote_to = span[0].innerHTML;
				}
				promotion_dialog.dialog('close');
				$('.ui-selectee').removeClass('ui-selected');
				updateBoard(board);
			});
		}
	});

});
