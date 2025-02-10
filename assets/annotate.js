// ---------------------
// Annotation functions
// ---------------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab"] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, game, document, currentPuzzle, moveHistory, readItem */

/* eslint no-unused-vars: "error" */
/* exported drawDot, clearAllDots, markError, annotate, KingCheckorMate */


// Annotation Color-related data
// -----------------------------
let colorDictionary = [
	{ letter: "r", name: "red" },
	{ letter: "b", name: "blue" },
	{ letter: "y", name: "yellow" },
	{ letter: "g", name: "green" },
];

const validLetters = "abcdefgh";
const validNumbers = "12345678";

const squarePath = "#myBoard > .chessboard-63f37 > .board-b72b1 > .row-5277c > .square-";

// Credit to https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value for this neat RGB to Hex conversion function
const rgb2hex = (rgb) =>
	`#${rgb
		.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
		.slice(1)
		.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
		.join("")}`;




/**
 * Draws a grey dot on the specified square
 * 
 * @param {string} square - The target square
 * @returns 
 */	
function drawDot(square) {
	if (!validateSquare(square)) {
		return;
	}

	// Draw the dot on top of anything else on that square
	$(".square-" + square).append('<div class="dot"></div>');
}

/**
 * Draw a dot in the center of the square (used for showing legal moves)
 */
function clearAllDots() {
	// Delete the legal move dots
	$(".dot").remove();
}

/**
 * Flash a sqaure red
 */
function markError(square) {
	if (!validateSquare(square)) {
		return;
	}

	// add position relative to container (so the error div is placed on top of the square)
	$(".square-" + square).css("position", "relative");

	// Make the square red
	$(".square-" + square).append('<div class="error"></div>');

	// Flash the square red briefly
	$(".error").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
}

/**
 * Draw any recorded shape data for this move (circles or arrows)
 *
 * @param {int} offset  - Value to increase the move index (so you can draw shapes from moves ahead of the game if present)
 */
function annotateShapes(offset) {
	// return if turned off in settings
	if (readItem("circlesarrows") == "0") {
		return;
	}

	offset = offset || 0;
	let gameMoveIndex = game.history().length - 1 + offset; // Last move played

	try {
		drawAnnotationCircle(currentPuzzle.moves[gameMoveIndex].commentDiag.colorFields);
	} catch (e) {
		// Object doesn't exist yet, therefore don't draw
	}

	try {
		drawAnnotationArrow(currentPuzzle.moves[gameMoveIndex].commentDiag.colorArrows);
	} catch (e) {
		// Object doesn't exist yet, therefore don't draw
	}

	try {
		if (gameMoveIndex === -1) {
			drawAnnotationCircle(currentPuzzle.gameComment.colorFields);
		}
	} catch (e) {
		// Object doesn't exist yet, therefore don't draw
	}

	try {
		if (gameMoveIndex === -1) {
			drawAnnotationArrow(currentPuzzle.gameComment.colorArrows);
		}
	} catch (e) {
		// Object doesn't exist yet, therefore don't draw
	}

}

/**
 * Validate input square
 *
 * @param {*} square    - The square needing validation
 * @returns true if square is valid, false if not
 */
function validateSquare(square) {
	// Input must be 2 characters
	if (square.length !== 2) {
		return false;
	}

	// Input's first character is between a-h
	let character = square.substring(0, 1).toLowerCase();
	if (validLetters.indexOf(character) < 0) {
		return false;
	}

	// Input's second character is between 1-8
	character = square.substring(1, 2);
	if (validNumbers.indexOf(character) < 0) {
		return false;
	}

	return true;
}

/**
 * Validate drawing annotation
 *
 * @param {*} inputtext     - The drawing instruction from the PGN
 * @returns true if drawing annotation is valid, false if not
 */
function validateInput(inputtext) {
	// Input has to be either 3 or 5 characters long
	if (inputtext.length !== 3 && inputtext.length !== 5) {
		return false;
	}

	// Input's first letter is one of the 4 colors
	if (!colorDictionary.some((el) => el.letter === inputtext.substring(0, 1).toLowerCase())) {
		return false;
	}

	// Input's square must be valid
	if (!validateSquare(inputtext.substring(1, 3))) {
		return false;
	}

	// Input's second square (if present) must be valid
	if (inputtext.length === 5 && !validateSquare(inputtext.substring(3, 5))) {
		return false;
	}

	return true;
}

/**
 * Prepare drawing instructions
 *
 * @param {*} inputtext - Drawing instruction
 * @returns object with details necessary to draw circles and arrows according to the drawing instruction
 */
function generateDrawingData(inputtext) {
	// First validate that the input is good:
	if (!validateInput(inputtext)) {
		return;
	}

	// Input is valid - Create the object
	let squareObject = {};
	squareObject.colorletter = inputtext.substring(0, 1).toLowerCase();
	squareObject.colorname = colorDictionary.find(({ letter }) => letter === squareObject.colorletter).name;

	squareObject.origin = inputtext.substring(1, 3).toLowerCase();
	squareObject.originxy = getSquareCenterCoordinates(squareObject.origin);

	squareObject.destination = inputtext.substring(3, 5).toLowerCase();
	squareObject.destinationxy = "";
	if (squareObject.destination) {
		squareObject.destinationxy = getSquareCenterCoordinates(squareObject.destination);
	}

	return squareObject;
}

/**
 *
 * @param {array} circleArray   - Array of square and color data needing circles drawn
 * @returns
 */
function drawAnnotationCircle(circleArray) {
	if (!circleArray) {
		return;
	} // Input is empty

	if (!Array.isArray(circleArray)) {
		return;
	} // Input is not an array

	circleArray.forEach((circle) => {
		if (!validateInput(circle)) {
			return;
		}

		let annotationdata = generateDrawingData(circle);

		// Look up the color for the provided code
		let colorname = annotationdata.colorname;

		// Define the target square
		let target = $(squarePath + annotationdata.origin);

		// Draw the circle on top of anything else on that square
		//let circleDetails = '<div class="circleannotation" style="border-color: ' + colorname + ';pointer-events: none;"></div>';
		let circleDetails = '<div class="circleannotation" style="border-color: ' + colorname + ';"></div>';
		$(target).append(circleDetails);
	});
}


/**
 * Draw a red gradient behind the king (technically any square)
 * 
 * @param {string} kingsquare - The square that needs the gradient to show (typically the King as that is they only time this would be called)
 * @returns 
 */
function KingCheckorMate(kingsquare) {
	// Ensure a good square first
	if (!validateSquare(kingsquare)) {
		return;
	}

	let target = $(squarePath + kingsquare);
	let checkOrMate =
		'<div class="kingcheckormate" style="background-image: radial-gradient(circle, red, ' + rgb2hex($(target).css("background-color")) + ');"></div>';

	// Add the color
	$(target).append(checkOrMate);
}

/**
 * Deletes any currently visible circles or arrows
 */
function deleteAllShapeAnnotations() {
	// Delete the circles
	$(".circleannotation").remove();

	// Delete the arrows
	createCanvas();
}

/**
 * Replace CR/LR and LF with <br> for breaks in the annotation window.  Helper function for annotate()
 * @param {string} sourcetext - The content to have the CR/LF and LF codes swapped with <br>
 *
 * @returns {string}
 */
function stripNewLine(sourcetext) {
	if (!sourcetext) {
		return;
	}

	let strippedtext;

	strippedtext = sourcetext.replaceAll("\r\n", "<br>"); // Windows CR/LF
	strippedtext = sourcetext.replaceAll("\n", "<br>"); // Linux LF

	return strippedtext;
}

/**
 * Update the annotation panel with the supplied text.  Helper function for annotate()
 * @param {string} annotationText - The content to be added to the annotation panel
 */
function addAnnotationComment(annotationText) {
	if (annotationText) {
		$("#comment_annotation").append("<br><br>");
		$("#comment_annotation").append(stripNewLine(annotationText));
		$("#comment_annotation").append("<br><br>");
	}
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
		{ code: "$0", number: 0, symbol: "", description: "" },
		{ code: "$1", number: 1, symbol: "!", description: "Good move" },
		{ code: "$2", number: 2, symbol: "?", description: "Mistake" },
		{ code: "$3", number: 3, symbol: "!!", description: "Brilliant move" },
		{ code: "$4", number: 4, symbol: "??", description: "Blunder" },
		{ code: "$5", number: 5, symbol: "!?", description: "Interesting move" },
		{ code: "$6", number: 6, symbol: "?!", description: "Dubious move" },
		{ code: "$7", number: 7, symbol: "\u25a1", description: "Only move" },
		{ code: "$8", number: 8, symbol: "\u25a1", description: "Singular move" },
		{ code: "$9", number: 9, symbol: "\u25a1", description: "Worst move" },
		{ code: "$10", number: 10, symbol: "=", description: "Equal position" },
		{ code: "$11", number: 11, symbol: "=", description: "Equal chances, quiet position" },
		{ code: "$12", number: 12, symbol: "=", description: "Equal chances, active position" },
		{ code: "$13", number: 13, symbol: "\u221e", description: "Unclear position" },
		{ code: "$14", number: 14, symbol: "\u2a72", description: "White is slightly better" },
		{ code: "$15", number: 15, symbol: "\u2a71", description: "Black is slightly better" },
		{ code: "$16", number: 16, symbol: "\xb1", description: "White is better" },
		{ code: "$17", number: 17, symbol: "\u2213", description: "Black is better" },
		{ code: "$18", number: 18, symbol: "+-", description: "White is winning" },
		{ code: "$19", number: 19, symbol: "-+", description: "Black is winning" },
		{ code: "$22", number: 22, symbol: "\u2a00", description: "White is in Zugzwang" },
		{ code: "$23", number: 23, symbol: "\u2a00", description: "Black is in Zugzwang" },
		{ code: "$32", number: 32, symbol: "\u27f3", description: "White has development" },
		{ code: "$33", number: 32, symbol: "\u27f3", description: "Black has development" },
		{ code: "$36", number: 36, symbol: "\u2191", description: "White has the initiative" },
		{ code: "$37", number: 37, symbol: "\u2191", description: "Black has the initiative" },
		{ code: "$40", number: 40, symbol: "\u2192", description: "White has the attack" },
		{ code: "$41", number: 41, symbol: "\u2192", description: "White has the attack" },
		{ code: "$44", number: 44, symbol: "=\u221e", description: "White has compensation" },
		{ code: "$45", number: 45, symbol: "=\u221e", description: "Black has compensation" },
		{ code: "$132", number: 132, symbol: "\u21c6", description: "White has counterplay" },
		{ code: "$133", number: 132, symbol: "\u21c6", description: "Black has counterplay" },
		{ code: "$138", number: 138, symbol: "\u2295", description: "White has time trouble" },
		{ code: "$139", number: 139, symbol: "\u2295", description: "Black has time trouble" },
		{ code: "$140", number: 140, symbol: "\u2206", description: "With the idea" },
		{ code: "$146", number: 146, symbol: "N", description: "Novelty" },
	];

	// Look up the symbol for the provided code
	let tag = NAGDictionary.find(({ code }) => code === NAGValue).symbol;

	if (!NAGDictionary.some((el) => el.code === NAGValue)) {
		return;
	} // NAG code doesn't exist in the table

	return tag;
}

/**
 * Add annotations for null moves (if present)
 *
 * @param {int} moveindex   - The move index of the game to test for null moves
 */
function checkForNullMove(moveindex) {
	// Have we reached end of game?  Game cannot proceed beyond a null move.
	if (game.history().length === moveHistory.length) {
		// Check to see if the parser has more moves than the game.
		// If it does, this means that the parser found a null move and has recorded it AFTER the last move of the game.
		if (currentPuzzle.moves.length > game.history().length) {
			// Add any annotations if present
			try {
				addAnnotationComment(currentPuzzle.moves[moveindex + 1].commentAfter);
			} catch (e) {
				// Object doesn't exist, therefore don't do anything
			}

			// If the null move has any shape data as well, draw it.
			annotateShapes(1);
		}
	}
}

/**
 * Read details of the current move along with any avaialble annotations and display them
 */
function annotate() {
	// Clear any shapes
	deleteAllShapeAnnotations();

	let gameMoveIndex = game.history().length - 1; // Last move played
	if (game.history().length - 1 < 0) {
		gameMoveIndex = 0;
	}

	let currentMoveTurn = currentPuzzle.moves[gameMoveIndex].turn; // Color of move
	let moveNumber = currentPuzzle.moves[gameMoveIndex].moveNumber; // Number of move in SAN
	let moveNotation = currentPuzzle.moves[gameMoveIndex].notation.notation; // SAN move
	let nagcode = currentPuzzle.moves[gameMoveIndex].nag; // NAG of move

	let nagAnnotation = "";

	if (nagcode) {
		// Annotation code array found, retrieve each symbol to display next to the move
		nagcode.forEach((code) => {
			nagAnnotation += translateNAG(code);
		});
	}

	// This assumes that index 0 ALWAYS has a move number associated with it.  Maybe write a case to handle if index=0 AND moveNumber is null?
	if (moveNumber == null) {
		// Assumption is that this is black so use the white number (1 move prior)
		moveNumber = currentPuzzle.moves[gameMoveIndex - 1].moveNumber;
	}

	let moveAnnotation = "";

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

		// Check for null move
		checkForNullMove(gameMoveIndex);

		// Draw any shapes if present.
		annotateShapes();

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

	// Check for null move
	checkForNullMove(gameMoveIndex);

	// Add scroll here to automatically show the bottom of the column
	document.getElementById("comment_annotation").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

	// Draw any shapes that accompany this position
	annotateShapes();
}

/**
 * Get the XY coordinates indicating the center of a target square.
 *
 * @param {string} square   - The square requiring coordinate data
 * @returns coordinate data
 */
function getSquareCenterCoordinates(square) {
	// Define the target square
	let target = $(squarePath + square);

	// Find the center coordinates for the square relative to its container
	var centerX = target[0].offsetLeft + target[0].clientWidth / 2 - target[0].parentElement.parentElement.offsetLeft;
	var centerY = target[0].offsetTop + target[0].clientHeight / 2 - target[0].parentElement.parentElement.offsetTop;

	let coordinates = {};

	coordinates.x = centerX;
	coordinates.y = centerY;

	return coordinates;
}

/**
 * Arrow drawing function
 *
 * @param {*} ctx        - Canvas context
 * @param {*} fromx      - X coordinate of starting point
 * @param {*} fromy      - Y coordinate of starting point
 * @param {*} tox        - X coordinate of ending point
 * @param {*} toy        - Y coordinate of ending point
 * @param {*} arrowWidth - thickness of arrow
 * @param {*} color      - color of arrow
 * @param {*} alpha      - opacity of arrow
 *
 * Credit for this neat function belongs to https://stackoverflow.com/questions/808826/drawing-an-arrow-using-html-canvas
 */
function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color, alpha) {
	//variables to be used when creating the arrow
	var headlen = 10;
	var angle = Math.atan2(toy - fromy, tox - fromx);

	ctx.save();
	ctx.strokeStyle = color;

	//ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.globalAlpha = alpha;

	//starting path of the arrow from the start square to the end square
	//and drawing the stroke
	ctx.beginPath();
	ctx.moveTo(fromx, fromy);
	ctx.lineTo(tox, toy);
	ctx.lineWidth = arrowWidth;
	ctx.stroke();

	//starting a new path from the head of the arrow to one of the sides of
	//the point
	ctx.beginPath();
	ctx.moveTo(tox, toy);
	ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

	//path from the side point of the arrow, to the other side point
	ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

	//path from the side point back to the tip of the arrow, and then
	//again to the opposite side point
	ctx.lineTo(tox, toy);
	ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

	//draws the paths created above
	ctx.stroke();
	ctx.restore();
}

/**
 * Draws all arrows as instructed
 *
 * @param {array} ArrowArray  - Arraay of drawing instructions
 * @returns
 */
function drawAnnotationArrow(ArrowArray) {
	// Exit immediately if there are issues with the input
	if (!ArrowArray) {
		return;
	} // Input is empty

	if (!Array.isArray(ArrowArray)) {
		return;
	} // Input is not an array

	// Create the canvas to draw the arrows
	createCanvas();
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	const linewidth = 5;
	const opacity = 0.5;

	// Loop through the array of arrows and draw each one
	ArrowArray.forEach((arrow) => {
		if (!validateInput(arrow)) {
			return;
		}

		let annotationdata = generateDrawingData(arrow);

		// Look up the color for the provided code
		let colorname = annotationdata.colorname;

		let startPoint = annotationdata.originxy;
		let endPoint = annotationdata.destinationxy;

		drawArrow(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, linewidth, colorname, opacity);
	});
}

/**
 * Create a 2d drawing surface for the arrows
 */
function createCanvas() {
	// Credit for this function goes to https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
	function fitToContainer(canvas) {
		// Make it visually fill the positioned parent
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		// ...then set the internal size to match
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

	// Create a Div and then a canvas on top of the board
	if (!$("#myCanvasDiv").length) {
		// element does not yet exist
		//$("#myBoard > .chessboard-63f37 > .board-b72b1").append('<div id="myCanvasDiv" class="canvas" style="pointer-events: none;"></div>');
		$("#myBoard > .chessboard-63f37 > .board-b72b1").append('<div id="myCanvasDiv" class="canvas"></div>');
		$("#myCanvasDiv").append('<canvas id="myCanvas" style="pointer-events: none;"></canvas>');
	}

	var canvas = document.querySelector("#myCanvas");
	fitToContainer(canvas);
}
