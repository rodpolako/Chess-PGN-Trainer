# Changes in this version:

## New features ##
* Added a feature to automatically retry any failed puzzles.  With this setting turned on, the testing will continue until all the puzzles have been completed correctly.  Any failed puzzles will be retested until correct.  Default is off.
* Reworked the data reporting capabilities to remove some columns and update existing ones. See [Wiki](https://github.com/rodpolako/Chess-PGN-Trainer/wiki#performance-reporting) for full details.

## Bug fixes ##
* Fixed a bug where the locally cached copy of lichess studies would remain if the Lichess UserID changed.
* Fixed a bug where the list of studies don't always retain the corect sort.
* Fixed a bug where annotations and drawings were not present in the re-attempted lines.
* Fixed a bug where the analysis position in Lichess would not flip when black to move  .  
* Fixed cosmetic issue with the location of the sort functions in the Lichess study listing.

## Maintenance ##
* No other maintenance items with this release.
