/**
 * Piece theme list
 * 
 * This file creates the PieceList object which is used by the application to give the option of piece sets
 * 
 * There are three values needed:
 * Name - The name to display in the Piece Select drop down
 * DirectoryName - The name of the directory which contains the pieces
 * Type - The extension of the piece images (typically SVG or PNG)
 * 
 * A piece folder contains 12 files (6 for white and 6 for black) that start with either b or w (black or white) 
 * and then one of the following uppercase letters to indicate the piece:
 *      K - King
 *      Q - Queen
 *      B - Bishop
 *      N - Knight
 *      R - Rook
 *      P - Pawn
 * 
 * As an example, bK would indicate black king while wP would indicate white pawn. See any of the current piece sets for examples.
 * 
 * 
 * To add a piece set to the application:
 * 1. create a folder containing the pieces inside /img/chesspieces 
 * 2. update the object below to add an entry for the new set
 * 3. Refresh the page and the new set will be listed in the drop down
 * 
 */

PieceList = [
    { Name: 'Alpha', DirectoryName: 'alpha', Type: 'svg' },
    { Name: 'Cburnett', DirectoryName: 'cburnett', Type: 'svg' },
    { Name: 'Chessnut', DirectoryName: 'chessnut', Type: 'svg' },
    { Name: 'Merida', DirectoryName: 'merida', Type: 'svg' },
    { Name: 'Staunty', DirectoryName: 'staunty', Type: 'svg' },
    { Name: 'Tatiana', DirectoryName: 'tatiana', Type: 'svg' }
]
