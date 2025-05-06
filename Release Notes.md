# Changes in this version:

## New features ##
* Support for drilling directly from Lichess studies!  Add your Lichess user ID and API token and you will be able to load a chapter or even an entire study for drilling. **Note: An API token is required for loading unlisted and private studies.  If you are only using public studies, then you don't need a token, just your Lichess user ID.** See the [Wiki](https://github.com/rodpolako/Chess-PGN-Trainer/wiki) for details on how to get a Lichess API token.
* Added an indicator on the board which will add color to the squares involved in the last played move.
* Added an indicator (Large grey circle) for any captures available when "Show legal moves" is enabled.
* Added the comment panel to display below the board and progress area and fit in the available space when using phones in portrait mode.  Depending on your mobile device, you may not have a lot of visible area.
* Enhanced the error handling when the pgn parser encounters an issue with a file.  It will now show approximately where in the pgn the issue is originating from which should make troubleshooting a pgn much easier.
* Improved handling of null moves and pgns with no moves.

## Bug fixes ##
* Fixed issue where the analysis button (magnifying glass) would remain active while paused. 
* Fixed issue where scrolling would re-enable on mobile devices in portrait mode if the user goes into settings. 
* Fixed issue with the color pickers not updating the board if you copy/paste a color value that doesn't start with a #.  It will now accept either format.
* Fixed issue with the legal move dots where the opacity was 100% when a pawn was able to promote.
* Fixed issue where modals would trigger an aria-hidden warning when closed.
* Fixed issue with audio not playing for first move after turning on the feature (if it was previously disabled).

## Maintenance ##
* ***Massive*** code cleanup and refactoring.  This is to increase maintainability as well as setting the base infrastructure to add new features in the future in a modular way.
* Replaced the favicon with a simpler version that matches the color scheme.
* Incorporated the newest version of the pgn-parser (1.4.16) which improved support for null moves in PGN files.
* Incorporated the newest version of chess.js (1.20.0) which replaces the absolutely ***ancient*** version (0.10.2) that was running previously.
* Incorporated the newest version of Bootstrap (5.3.5) which included a large number of fixes from 5.3.3.
