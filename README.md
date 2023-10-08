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
* Play Opposite Side - Allows the player to go second and makes the computer play the first move instead from the PGN.  Useful for when you want to practice opening defenses instead of puzzles.  For example, if you wanted to practice a defense as black, load a PGN with the move order you want to practice and this feature will play as white and play the moves in the PGN while you play the response.  Recommended that you use the Flipped option in conjunction with this one.
* Pause - Useful if you are doing a large number of puzzles and need to step away.  Click on the pause button and the board will clear and the timer will stop.  Click Resume in order to continue.  Your elapsed time will not include the paused time.
* **New** - Added a hint function.  You can hold down the **spacebar** at any time during a puzzle to see the expected move.  Just know that if a hint is used, it will be counted as an error in your performance.
* **New** - Added the ability to restart/replay the current puzzleset upon completion. Useful if you want to try again with the same settings.  When the current set is complete, just click on "Restart" to try the current PGN file again.  You can choose different settings like random, flipped, etc. before trying again.
  
Once a test group is completed, tool displays the following performance information:
* Number of errors
* Time to completion
* Average time per puzzle (Calculated)
* Error rate (Calculated)

## Known limitations
* The PGN parser ignores variations in a PGN file.  Attempting to use a PGN with these will not work and will only play the "main-line".  If you want to work a line that has variations, break out each variation into its own entry in the PGN.
For example, the following PGN shows a position where the black king has two possible moves recorded after Qe5+:
```
[Event "?"]
[FEN "r1r1k3/5p2/3K4/2Q5/8/8/8/8 w - - 1 1"]

1. Qe5+ Kf8 (1... Kd8 2. Qe7#) 2. Qh8# 1-0
```
Loading this PGN as-is will result in the tool indicating that there is only 1 puzzle, the main line. To get the tool to test the main line and the variation, copy the entry and show each variation separately.  Like this:

```
[Event "?"]
[FEN "r1r1k3/5p2/3K4/2Q5/8/8/8/8 w - - 1 1"]

1. Qe5+ Kf8 2. Qh8# 1-0

[Event "?"]
[FEN "r1r1k3/5p2/3K4/2Q5/8/8/8/8 w - - 1 1"]

1. Qe5+ Kd8 2. Qe7#
```
In this way, the tool will see that there are two puzzles and test both.

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
7. You can pause any time if you need to step away.
8. If you get stuck you can get a hint by holding down the **spacebar**

You can then start a new PGN file by repeating these steps.

## References
Built with the help of the following projects:
* [chess.js](https://github.com/jhlywa/chess.js) chess.js is a TypeScript chess library used for chess move generation/validation, piece placement/movement, and check/checkmate/stalemate detection - basically everything but the AI.
* [pgn-parser](https://github.com/mliebelt/pgn-parser): Javascript library to allow reading of a PGN (Portable Game Notation) chess game notation, and providing the result as JSON.
* [chessboardjs](https://github.com/oakmac/chessboardjs/) chessboard.js is a standalone JavaScript Chess Board. It is designed to be "just a board" and expose a powerful API so that it can be used in different ways.
* [pawn-promotion](https://github.com/siansell/pawn-promotion) Quick and dirty example showing one approach to pawn promotion with chessboard.js and chess.js.


## Possible ideas for improvements/features
* Add the ability to set the options via tags in the PGN so that if I always want to play a set with specific settings (such as randomized) loading the PGN also sets the options.
* Enhance the PGN-Parser to also read variations and load each variation as another puzzle.
* While the site does work on mobile, it is not optimized for that format.  A UI overhaul with a responsive design would be nice.
* Add an option to auto-save the results to a hosted file.  Maybe something like adding a row to a google sheet?
* What would be really nice is if there was a way to organize all the PGNs I want to test as part of a larger structure so that I would be able to choose from a defined list which includes the info on the PGN file to use along with the desired settings.  Not immediately sure how this would work due to security restrictions on the browser preventing direct access to local files.
