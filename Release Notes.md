# Changes in this version:

## New features ##
* Update to the Lichess studies feature.  You can now put the same commands used to pre-select trainer options into the study itself and the trainer will use them.  See the wiki on how exactly to use this feature.
* Graphical annotation symbols have been added.  Any moves marked with any of the standard notation symbols (like ?? or !!) will now show in a little circle by the piece.  Due the ability to choose any combination of board colors, the different types of symbols will not have unique colors.  Rather they will use a complementary color based on the board color setup (similar to the color system used for showing the squares of the last moved piece).

## Bug fixes ##
* Fixed issue with both Safari and Firefox that arose from the refactor due to unsupported functionality.  Reverted the problematic code.
* Fixed issue with comments accompanying a null move not displaying in the annotation panel.

## Maintenance ##
* More code cleanup and refactoring.
* Customized local copy of chess.js to address issues flagged CodeQL.
* Incorporated the newest version of the pgn-parser (1.4.18) which provides detailed information on where in a PGN an error was encountered. Loading a PGN with an issue will now present a message showing the line and column number where the error occurred.  It will also show the exact character preceeded with a double-asterisk along with some of the surrounding content of the PGN.  
As an example, if you had a PGN with a typo for a move (in this case Kq1), attempting to load the file will return the following:
```
SyntaxError: Expected "@", "x", or [a-h] but "q" found.

Error at line 38, column 14:
36: [PlyCount "3"]
37: 
38: 1... Bd5 2. K**q1 (2. h3 Bxe4+) 2... Bxe4 *
```
<ul><li style="list-style-type: none;">To fix your PGN, all you need to do is open the file in a file editor and do a search for ** and that should take you straight to the problem.  In this example, the error tells me that the issue was on the 38th line of this file at the 14th character</li></ul>
