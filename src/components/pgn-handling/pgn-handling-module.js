// ---------------------
// PGN related Functions
// ---------------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $ */

/* eslint no-unused-vars: "error"*/
/* exported */

import { parse } from '../../lib/pgn-parser/pgn-parser-1.4.18-esm-min.js';

/*
	Source: https://github.com/mliebelt/pgn-parser

	Component download:
	https://www.npmjs.com/package/@mliebelt/pgn-parser 

	https://unpkg.com/@mliebelt/pgn-parser@1.4.18/lib/index.umd.js // Original
	https://cdn.jsdelivr.net/npm/@mliebelt/pgn-parser@1.4.18/lib/index.umd.min.js // Minified
	https://cdn.jsdelivr.net/npm/@mliebelt/pgn-parser@1.4.18/+esm // Minified ESM version

*/

/**
 * Split the PGN data into unique games based on presense of variants
 *
 * @param {json} PGNData The JSON formatted data parsed from the PGN parser
 */
function splitvariants(PGNData) {
	let PGNobjectArray = [];

	/**
	 * Recursive function to follow a variation path
	 *
	 * @param {*} myObject The object to pathfind
	 * @param {*} pathlist The current path to get to the object
	 */
	function createPGNVariant(myObject, pathlist) {
		let tempObj = [];
		Object.assign(tempObj, pathlist);

		myObject.forEach((element) => {
			tempObj.push(element); // Add the current step

			if (element.variations.length > 0) {
				// alternate steps found...
				tempObj.pop(); // remove the current step that was added (since we are adding more inside)
				element.variations.forEach((child) => createPGNVariant(child, tempObj)); // Explore that alternate path
				element.variations.length = 0; // Clear this variation branch now that it has been traversed
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

	// Replace other null move identifiers with Z0 notation which is already supported by the parser as a null move.
	// See: https://chess.stackexchange.com/questions/14072/san-for-nullmove for list of possible null move indicators

	let NullMoveIndicators = ['0000', '00-00', '@@@@', '<>', '(null)'];

	// Excluding "null" and "pass" so that it doesn't inadvertently change any annotation text (like "passed pawn" becoming "Z0ed pawn")
	// Also excluding "--" from replacement since it is now directly supported in the parser.  Internally, the object returned will replace it to Z0.

	NullMoveIndicators.forEach((nullmove) => {
		PGNData = PGNData.replaceAll(nullmove, 'Z0');
	});

	// Fix for weird issue in some PGNs where the draw indication has extra spaces which will fail parsing
	PGNData = PGNData.replaceAll('1/2 - 1/2', '1/2-1/2');

	return PGNData;
}

/**
 * Feed the PGN file provided by the user here to the PGN Parser
 *
 * @param {text} PGNFile The text of the PGN file to parse
 * @returns {object} The parsed JSON object of the PGN file
 */
function loadPGNFile(PGNFile) {
	let puzzleset = [];

	// Clean up before parsing
	PGNFile = cleanPGNFile(PGNFile);
	// Try to parse the file.  Display error if issue discovered.
	try {
		// Get original set of puzzles from the PGN
		let puzzlesetOriginal = parse(PGNFile, { startRule: 'games' });

		// Split the variants out and add each puzzle to the final testing set.
		puzzlesetOriginal.forEach((puzzle) => {
			puzzleset.push(...splitvariants(puzzle));
		});

		return puzzleset;
	} catch (err) {
		$('#errorText').empty();
		$('#errorText').append('<div id="errorConent">There is an issue with the PGN file.  Error message is as follows:</div><br>');
		$('#errorText').append('<div id="errorConent">' + `${err.name}: ${err.message}` + '</div><br>');
		$('#errorText').append('<div id="errorConent" class="font-monospace" style="white-space: pre;">' + err.errorHint + '</div>');
		$('#errorModal').modal('show');

		return [];
	}
}

export { loadPGNFile };
