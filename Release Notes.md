# Changes in this version:

* Updated the handling of null moves to remove "pass" and "null" as a null move indictor as it would unintentionally replace annotation text (such as "passed pawn" to "Z0ed pawn")
* Minor UI update where a red gradient will appear behind the king when it is in check/checkmate
* Added menu option to turn off circles and arrows via settings
* Removed "Analysis Board" option and replaced with a magnifying glass icon which will always be available and analyze the currently displayed position. As a result, I also removed support for the \[PGNTrainerAnalysisLink\] tag since it is no longer relevant.
* Fixed bug where headers are not copying to the clipboard despite the setting