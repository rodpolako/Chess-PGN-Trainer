// ------------------------
// Pawn Promotion functions
// ------------------------

/* global pieceThemePath, game, $, moveCfg, makeMove, checkAndPlayNext, updateBoard */
/* exported getPieces, onPromotionDialogClose  */

// Promotion variables
let promotionSquare;

/**
 * Get an individual piece image based on the color of the current player
 *
 * @param {chess} piece - A chess piece
 * @returns {*}
 */
function getImgSrc(piece) {
    return pieceThemePath.replace("{piece}", game.turn() + piece.toLocaleUpperCase());
}

/**
 * Populate the pawn promotion modal
 */
function getPieces() {
    let piecelist = ["q", "r", "n", "b"];

    piecelist.forEach((piece) => {
        $("#" + piece).attr("src", getImgSrc(piece));
    });
}

/**
 * Set the promotion value in the move config and make the move
 *
 * @param {button} button   The button that called the function
 */
function onPromotionDialogClose(button) {
    moveCfg.promotion = button[0].id;
    makeMove(game, moveCfg);
    checkAndPlayNext(promotionSquare);
    updateBoard(true);
}
