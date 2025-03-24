// ---------------------
// PGN related Functions
// ---------------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, resetGame, console, puzzleset:writable, PgnParser, alert   */
/* global setDisplayAndDisabled, document, setCheckboxSelectability */
/* global confirmOnlyOneOption, FileReader */

/* eslint no-unused-vars: "error" */
/* exported loadPGNFile */



/**
 * Split the PGN data into unique games based on presense of variants
 * @param {json} PGNData - The JSON formatted data parsed from the PGN parser
 */
function splitvariants(PGNData) {
	let PGNobjectArray = [];

	// Recursive function to follow a variation path
	function createPGNVariant(myObject, pathlist) {
		let tempObj = [];
		Object.assign(tempObj, pathlist);

		myObject.forEach((element) => {
			tempObj.push(element); // Add the current step

			if (element.variations.length > 0) {
				// alternate steps found...
				tempObj.pop(); // remove the current step that was added (since we are adding more inside)
				element.variations.forEach((child) => createPGNVariant(child, tempObj)); // Explore that alternate path
				tempObj.push(element); // Add back the current step to continue in the current path
			}
		});

		PGNobjectArray.push(tempObj); // Add this to the array of paths
	}

	// Now create an array of each set of unique moves
	createPGNVariant(PGNData.moves);

	// Create an array of complete PGN JSON objects each with a unique set of moves taken from PGNobjectArray
	let PGNExploded = [];

	// Create a new element in the array for each variant
	PGNobjectArray.reverse().forEach((variant) => {
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
 * PGN File pre-processing and cleanp prior to parsing
 *
 * @param {string} PGNData - The raw text version of the PGN file
 * @returns {string} - The processed text version of the PGN file
 */
function cleanPGNFile(PGNData) {
	// Clean up the file prior to processing
	PGNData = PGNData.trim(); // Remove extra blank lines before and after the content

	// Remove non-Z0 notation for null move (such as --) if present (causes exception otherwise)

	// Opened issue @ https://github.com/mliebelt/pgn-parser/issues/641
	// Potential fix due to https://github.com/mliebelt/pgn-parser/issues/436
	// Replace other null identifiers with Z0 notation which is already supported by the parser as a null move.

	// See: https://chess.stackexchange.com/questions/14072/san-for-nullmove for list of possible null move indicators

	let NullMoveIndicators = ['0000', '00-00', '--', '@@@@', '<>', '(null)'];
	// Excluding "null" and "pass" so that it doesn't inadvertently change any annotation text (like "passed pawn" becoming "Z0ed pawn")

	NullMoveIndicators.forEach((nullmove) => {
		PGNData = PGNData.replaceAll(nullmove, 'Z0');
	});

	return PGNData;
}

/**
 * Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
 */
function loadPGNFile() {
	resetGame();
	let PGNFile;

	const [file] = document.getElementById('openPGN').files;
	const reader = new FileReader();

	reader.addEventListener(
		'load',
		() => {
			PGNFile = reader.result;

			// Clean up before parsing
			PGNFile = cleanPGNFile(PGNFile);

			// Try to parse the file.  Display error if issue discovered.
			try {
				parsePGN(PGNFile);

				// File is now loaded
				// Update the range of the puzzle counters to the size of the puzzleset
				$('#puzzleNumber').text('1');
				$('#puzzleNumbertotal').text(puzzleset.length);

				// Set any startup options found in the PGN
				setStartupOptions();

				// Enable the start button
				setDisplayAndDisabled(['#btn_starttest'], 'inline-block', false);
			} catch (err) {
				alert(
					'There is an issue with the PGN file.  Error message is as follows:\n\n' +
						err +
						'\n\nPuzzles loaded successfully before error: ' +
						puzzleset.length
				);
				console.log(err);
				console.log(puzzleset);
				console.log(PGNFile);
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

	// Clear the file value in the Open PGN control (to prepare for the next file)
	$('#openPGN').val('');

	// Close the sidebar
	$('#close_sidebar').click();
}

/**
 * Set the program options based on the presence of PGNTrainer tags
 */
function setStartupOptions() {
	// Set the options checkboxes if any of the special tags at the top of the PGN have a value of 1

	let PGNTagList = [
		{ PGNTagName: 'PGNTrainerBothSides', switchname: '#playbothsides' },
		{ PGNTagName: 'PGNTrainerOppositeSide', switchname: '#playoppositeside' },
		{ PGNTagName: 'PGNTrainerRandomize', switchname: '#randomizeSet' },
		{ PGNTagName: 'PGNTrainerFlipped', switchname: '#flipped' },
		{ PGNTagName: 'PGNTrainerNextButton', switchname: '#manualadvance' },
	];

	// Load settings to the switches
	PGNTagList.forEach((setting) => {
		if (puzzleset[0].tags[setting.PGNTagName] === '1') {
			$(setting.switchname).prop('checked', true);
		}
	});

	// Make sure that both "Play both sides" and "Play opposite side" are not selected (if yes, clear both)
	confirmOnlyOneOption();
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
	puzzlesetOriginal.forEach((puzzle) => {
		puzzleset.push(...splitvariants(puzzle));
	});
}
