# Changes in this version:
* Update to the PGN parsing functions to add support for annotations - Moves and comments in PGN files will now display in the new annotation panel on the left. 	Supports HTML tags so the PGN comments can be fully featured with things like headings, bullets, bold, italics, links, thumbnails, etc.  If present, annotations will display while completing the puzzle.  The annotation panel will only be available on screens wider than 992 pixels (1024 or higher recommended).

*  All of the example files have been updated and showcase the annoation handling feature.

* Complete rewrite of UI for visual fixes and for handling odd sizes of screens/resolutions. 

* Customized version of chessboardjs to support intelligent resizing.  Zoom will no longer be needed to make the board use available space.  Adjusting the width now will auto size the board without exceeding available vertical space.

* Fix the auto clipboard copy which can crash the page in event browser does not have permissions to access the clipboard.  You will not be able to turn on the feature until clipboard access permission is granted to the browser.

* Migration of front end from W3 CSS to Bootstrap for improved performance and flexibility

* Fix piece drag issue that causes board to shift slightly if dragging a piece off the board, especially BELOW the board. 

* Replaced color picker with a more mobile-friendly version.  Now works as it should on desktops, tablets, and phones.

* Made minor change where choosing "play opposite side" will by default also turn on "flipped".  The use case is that generally playing the opposite side would be from the other side of the board as well.  Flipped can always be turned off if you want to just use "play opposite side" without flipping the board.  This has no impact on PGNs using these tags.  They will continue to be set as per the PGN.

* Add a "Next Button" mode which disables the auto-advance so that if you are reading the annotations you can read any last comments and then manually advance to the next line.  This is more useful if you want to review lines in a PGN and not drill it.  With this next option a new PGN tag has been added.  Using ```[PGNTrainerNextButton "1"]``` at the top the PGN file will turn on this feature automatically when loaded.

* Added ```MoveColor``` PGN tag which gives the ability to specify color to move when FEN indicates otherwise. This is used when puzzles are mixed where they **sometimes** make the first move to show you the move that led to the puzzle position.  If ALL puzzles in a set provide the first move and expect you to solve from the second (like Lichess), then the already existing "play opposite side" & "flipped" feature combo handles this and you don't need to have a separate tag.

The presence of this tag in a game will override the FEN.  Note:  Unlike the other tags which just go to the top of the file, this tag is at a per game level so it needs to be with the other tags for each game you need this functionality for.

Here is how it goes:

| Position starts with:   | MoveColor states:   | Player makes:   |
|:-------------|:-------------|:-------------|
|white | white | 1st move as white |
|white | black | 2nd move and plays as black and board will flip |
|black | white | 2nd move and plays as white and board will flip |
|black | black | 1st move as black |

To use this tag and force who goes first just add a ```[MoveColor "w"]``` (for white) and ```[MoveColor "b"]``` (for black) to any game in a PGN.