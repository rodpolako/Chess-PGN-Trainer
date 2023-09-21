# Chess-PGN-Trainer
Online tool that opens chess PGN files and allows the user to practice the moves.

[Live demo available here](https://rodpolako.github.io/)

![screenshot](screenshot.png)

This basic tool is to help with drilling a set group of puzzles but with any appropriately configured PGN file.  

PGN Files need only three parts:
* FEN - The representation of the board and associated information
* The moves for both white and black.
* (Optional) the "Event" tag so that the puzzle has a label

Here is an example PGN created using the analysis board from chess.com with a really basic endgame that was just saved to a file.
```
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
```
Use the "Open PGN file" button to open this file and you can practice this puzzle.  
![screenshot](screenshot2.png)

The PGN file can have any number of puzzles so you can work through a set in one shot.

This tool has a couple of other features that you might like:
* Auto move to next puzzle - Automatically advances to the next puzzle upon completion of the current one
* Play both sides - Allows the player to play both sides of the puzzle
* Randomize - Presents the puzzles in the set in a random order
* Flipped - Allows you to play the puzzle from the other side of the board.  May help to develop sense when a given tactic is being used on you.
* **New** - Added ability to pause.  Useful if you are doing a large number of puzzles and need to step away.  Click on the pause button and the board will clear and the timer will stop.  Click Resume in order to continue.  Your computed time will not include the paused time.
* **New** - Added ability to go second in order to allow the ability to practice opening defenses.  For example, if you want to practice as black, you can now have a PGN that will play as white and play the moves in the PGN while you play the response.  Recommend that you use the Flipped option in conjunction with this one.
  
Once a test group is completed, tool displays the following performance information:
* Number of errors
* Time to completion
* Average time per puzzle (Calculated)
* Error rate (Calculated)

## Setup Instructions
1. Download & extract the zip into a folder and start a web server from there.
2. In a browser, point to index.html.

## Usage
1. Click on "Open PGN File"
2. Navigate to the desired PGN file and then click on OK
3. Place a checkmark next to any desired features (such as random, flipped, play both sides)
4. When ready, click on start and the first puzzle in the set will be displayed and you can make your first move.
5. When the puzzle is finished, the next puzzle in the set will be automatically loaded
6. When the set of puzzles is complete, your final stats will be displayed.

You can then start a new PGN file by repeating these steps.

## References
Built with the help of the following projects:
* [chess.js](https://github.com/jhlywa/chess.js) chess.js is a TypeScript chess library used for chess move generation/validation, piece placement/movement, and check/checkmate/stalemate detection - basically everything but the AI.
* [pgn-parser](https://github.com/mliebelt/pgn-parser): Javascript library to allow reading of a PGN (Portable Game Notation) chess game notation, and providing the result as JSON.
* [chessboardjs](https://github.com/oakmac/chessboardjs/) chessboard.js is a standalone JavaScript Chess Board. It is designed to be "just a board" and expose a powerful API so that it can be used in different ways.
* [pawn-promotion](https://github.com/siansell/pawn-promotion) Quick and dirty example showing one approach to pawn promotion with chessboard.js and chess.js.


