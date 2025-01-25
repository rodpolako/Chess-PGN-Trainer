// ---------------------
// PGN related Functions
// ---------------------

/* global $, resetGame, console, puzzleset:writable, PgnParser, alert   */
/* global setDisplayAndDisabled, document, setCheckboxSelectability */
/* global confirmOnlyOneOption, FileReader */
/* exported splitvariants, parsePGN, loadPGNFile */

/**
 * Split the PGN data into unique games based on presense of variants
 * @param {json} PGNData - The JSON formatted data parsed from the PGN parser
 */
function splitvariants(PGNData) {
    let PGNobjectArray = [];

    function createPGNVariant(myObject, pathlist) {
        let tempObj = [];
        Object.assign(tempObj, pathlist);

        myObject.forEach((element) => {
            tempObj.push(element); // Add the current step

            if (element.variations.length > 0) {
                // alternate steps found...
                tempObj.pop(); // remove the current step that was added (since we are adding more inside)
                element.variations.forEach((child) => createPGNVariant(child, tempObj)); // Explore that alternate path
                tempObj.push(element); // Add back the current step to continue in the current path
            }
        });

        PGNobjectArray.push(tempObj); // Add this to the array of paths
    }

    // Now create an array of each set of unique moves
    createPGNVariant(PGNData.moves);

    // Create an array of complete PGN JSON objects each with a unique set of moves taken from PGNobjectArray
    let PGNExploded = [];

    // Create a new element in the array for each variant
    PGNobjectArray.reverse().forEach((variant) => {
        let node = {};
        node.tags = PGNData.tags; // Copy existing tags data
        node.gameComment = PGNData.gameComment; // Copy existing comment data
        node.moves = variant; // Copy this set's unique move order
        node.messages = PGNData.messages; // Copy existing messages data

        PGNExploded.push(node); // Add this new node to the collection
    });

    // Return the collection back
    return PGNExploded;
}

/**
 * Feed the PGN file provided by the user here to the PGN Parser and update/enable the controls
 */
function loadPGNFile() {
    resetGame();
    let PGNFile;

    const [file] = document.getElementById("openPGN").files;
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            PGNFile = reader.result;

            // Clean up the file prior to processing
            PGNFile = PGNFile.trim(); // Remove extra blank lines before and after the content

            // Remove double-hyphen notation if present (causes exception otherwise)
            // Opened issue @ https://github.com/mliebelt/pgn-parser/issues/641

            PGNFile = PGNFile.replace(/ (\d*)[.] --/g, ""); // White
            PGNFile = PGNFile.replaceAll("-- ", ""); // Black

            try {
                parsePGN(PGNFile);

                // File is now loaded
                // Update the range of the puzzle counters to the size of the puzzleset
                $("#puzzleNumber").text("1");

                $("#puzzleNumbertotal").text(puzzleset.length);

                // Set any startup options found in the PGN
                setStartupOptions();

                // Enable the start button
                setDisplayAndDisabled(["#btn_starttest"], "inline-block", false);
            } catch (err) {
                alert(
                    "There is an issue with the PGN file.  Error message is as follows:\n\n" +
                        err +
                        "\n\nPuzzles loaded successfully before error: " +
                        puzzleset.length
                );
                console.log(err);
                console.log(puzzleset);
                resetGame();
            } finally {
                // Do nothing else
            }
        },
        false
    );

    if (file) {
        reader.readAsText(file);
    }

    // Now that file is loaded, enable the ability to select options
    setCheckboxSelectability(true);

    // Clear the file value in the Open PGN control (to clear for the next file)
    $("#openPGN").val("");

    // Close the sidebar
    $("#close_sidebar").click();
}

/**
 * Set the program options based on the presence of PGNTrainer tags
 */
function setStartupOptions() {
    // Set the options checkboxes if any of the special tags at the top of the PGN have a value of 1
    if (puzzleset[0].tags.PGNTrainerBothSides === "1") {
        $("#playbothsides").prop("checked", true);
    }

    if (puzzleset[0].tags.PGNTrainerOppositeSide === "1") {
        $("#playoppositeside").prop("checked", true);
    }

    if (puzzleset[0].tags.PGNTrainerRandomize === "1") {
        $("#randomizeSet").prop("checked", true);
    }

    if (puzzleset[0].tags.PGNTrainerFlipped === "1") {
        $("#flipped").prop("checked", true);
    }

    if (puzzleset[0].tags.PGNTrainerAnalysisLink === "1") {
        $("#analysisboard").prop("checked", true);
    }

    if (puzzleset[0].tags.PGNTrainerNextButton === "1") {
        $("#manualadvance").prop("checked", true);
    }

    // Make sure that both "Play both sides" and "Play opposite side" are not selected (if yes, clear both)
    confirmOnlyOneOption();
}

/**
 * PGN file parser
 *
 * @param {string} PGNData - The PGN text data to parse. Can comprise of one or more games
 */
function parsePGN(PGNData) {
    puzzleset = [];

    // Get original set of puzzles from the PGN
    let puzzlesetOriginal = PgnParser.parse(PGNData);

    // Split the variants out and add each puzzle to the final testing set.
    puzzlesetOriginal.forEach((puzzle) => {
        puzzleset.push(...splitvariants(puzzle));
    });
}
