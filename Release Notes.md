# Changes in this version:

## New features ##
* Added the ability for the app to keep track of errors during a run and generate a PGN of the errors for targeted followup.  If any errors are made during a run, you will see a new option to either retry just the failed puzzles or download a ```mistakes.pgn``` file.

* Added a "Max Depth" setting which allows you to limit the length of the lines you are drilling against.  Useful when using this app to practice openings and you want to limit just how far the trainer will test you.  Note that this setting is for the **entire set** in the PGN or Lichess Study and **does** change the number of lines/puzzles to be tested if you reduce the depth to the point where lines become duplicates.  If duplicates are found, then the app will only test on the first instance.

* Added a new PGN tag for Max Depth setting which will override the main app's setting.  This is useful if you want to only limit a specific PGN or study instead of app-wide. This is available for both PGN files as well as Lichess studies.

    To set the max depth setting for PGN files use:
    ```[PGNTrainerMaxDepth "0"]```

    To set the max depth setting for Lichess studies, put this as a comment at the very beginning of the chapter:
    ```[%PGNTrainerMaxDepth 0]```

    and replace 0 with whatever depth you want between 3 and 49. This will override whatever your default setting is currently set to for that file/study only. As an example, you can keep your main setting for the app to unlimited but set a max depth just for a specific study to 5 ply. Any time you load that file/study, it will only go 5 ply deep. Everything else would go unlimited.

* Added autodetection of website links within the PGN annotations, removing the need for manual HTML.  Any link in the comments will now be clickable automatically and open in a new window.  Updated the relevant example PGNs to demonstrate.

* Added automatic embedded video to annotation section when a valid YouTube link is included in the PGN file.  No more custom HTML is required in the PGN in order to have a YouTube video automatically display in the annotation section (similar to the main screenshot).  Just put in the YouTube link directly in the PGN and the app will automatically display it.  Note that videos will only display on medium or larger screens.  On mobile or small displays it will not be visible.  A setting has been added to enable/disable this feature so that YouTube links will display just like any other link instead if desired.

* Added a new PGN tag called ```PGNTrainerAutoStart``` which will cause the test to start automatically once the PGN is loaded. May be useful for when selecting a PGN or study to simply save a click if you know you aren't going to be changing any settings and always use the current ones. 

    For PGN files use ```[PGNTrainerAutoStart "1"]``` and for Lichess studies use ```[%PGNTrainerAutoStart 1]```.  Any value other than 1 will disable auto-start.

* Update to the results CSV download feature. It will now keep a record of every run you complete in the current session (ie: until you close your browser) and then download all the runs into the csv/clipboard in one batch.

## Bug fixes ##
* Fixed a bug when a PGN is informational only and has no moves causing an exception in rare cases
* Fixed a bug with on mobile when trying to load a PGN while currently running a set.
* Fixed a bug with the results download & copy where the filenames and series values weren't populating
* Fixed a bug which allowed using the Next button while a game was paused.  

## Maintenance ##
* No other maintenance items with this release
