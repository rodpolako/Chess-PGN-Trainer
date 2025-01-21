# Changes in this version:
* **Variation support!** With this release, PGN files with variations are now able to be processed natively without the need to break out each variation into a separate game.  This will result in much smaller PGN files and make edit/updates simpler.  PGNs created with the analysis board on chess.com and lichess.org were tested.  Also, the example PGN files were updated were necessary.

## Improvements to the annotation functionality
* Added support for Numeric Annotation Glyphs (NAG) which indicate the quality of a move (such as "!!" or "??").  These annotations will now show up next to the moves in the annotation window.  They will not (yet) be visible on the board but that is planned with the next release.

* Added support for annoations with blank lines.  This will make PGNs and the annotations on screen easier to read.  The example PGNs have been updated where necessary.
