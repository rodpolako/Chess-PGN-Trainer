/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, setTimeout */

/* eslint no-unused-vars: "error"*/
/* exported */

// Required imports
import * as localStorage from './datatools-module.js';
import configuration from '../app/config.js';

// ----------------------------------------------------------------------------
// Other assorted functions and utilities available for use in multiple modules
// ----------------------------------------------------------------------------

/**
 * Display an error message on the screen
 *
 * @param {*} errorText
 */
function showErrorModal(errorText) {
	$('#errorText').empty();
	$('#errorText').append('<div id="errorConent">' + errorText + '</div>');
	$('#errorModal').modal('show');
}

/**
 * Generate a hash from a given string
 *
 * Adapted from:
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 *
 * @param {string} str The string to process
 * @returns A hash value generated from the source string
 */
function hashString(str) {
	var hash = 0,
		i,
		chr;
	if (str.length === 0) return hash;

	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

/**
 * Generate a hash for a given JSON object
 *
 * @param {object} obj The JSON object from which to generate a hash
 * @returns The hash of the JSON object
 */
function hashJSON(obj) {
	return hashString(JSON.stringify(obj));
}

/**
 * Sort a given array of objects alphabetically by a specified key
 *
 * Adapted from https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects/8175221#8175221
 *
 * @param {*} array The array containing the objects to sort
 * @param {*} key The key to use for the sort
 * @param {boolean} ascending Determines the sort order. By default it is ascending.  Set it to false to go in descending order.
 * @returns
 */
function sort_by_key(array, key, ascending = true) {
	return array.sort(function (a, b) {
		var x = a[key];
		var y = b[key];

		if (typeof a[key] === 'string') {
			x = a[key].toLowerCase();
			y = b[key].toLowerCase();
		}

		if (!ascending) {
			return x > y ? -1 : x < y ? 1 : 0;
		}
		return x < y ? -1 : x > y ? 1 : 0;
	});
}

/**
 * Shuffle contents of an array into random order
 *
 * Credit for this function goes to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * @param {array} array - The array to be shuffled
 * @returns {array}
 */
function shuffle(array) {
	let currentIndex = array.length;
	let randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

/**
 * Helper function for checking if user settings are activated so that users still having older version config options continue to work
 *
 * @param {string} setting The name of the setting to test
 * @returns {boolean} Boolean value if the test was successful
 */
function isSettingEnabled(setting) {
	if (localStorage.readItem(setting) === 'true' || localStorage.readItem(setting) === '1') {
		return true;
	}
	return false;
}

/**
 * A type-safe generic function to do try-catch
 *
 * Adapted from: https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b & https://www.youtube.com/watch?v=Y6jT-IkV0VM
 *
 * @param {*} promise The code to try
 * @returns The resulting data or error
 */
async function tryCatch(promise) {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error };
	}
}

/**
 * Generic delay function
 *
 * @param {int} duration Duration in milliseconds to wait
 * @returns
 */
async function wait(duration) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}

/**
 * Set the CSS display and disabled properties of a given element
 *
 * @param {array} listofElements - Array of controls to set in JQuery naming format (ie: prefaced with #)
 * @param {string} visible - Set to "block" to make the control visible. Set to "none" to hide the control.
 * @param {boolean} disabled - Set to true to disable the control. Set to false to enable the control.
 */
function setDisplayAndDisabled(listofElements, visible, disabled) {
	for (var elementName of listofElements) {
		// Set the visibility of the element
		if (visible !== undefined) {
			$(elementName).css('display', visible);
		}

		// Set the status of the disabled property of the element
		if (disabled !== undefined) {
			$(elementName).prop('disabled', disabled);
		}
	}
}

/**
 * Either turn on or off the ability to select options (ie: don't allow changes while in a game)
 *
 * @param {boolean} state - Set to true to enable the checkboxes. Set to false to disable the checkboxes.
 */
function setCheckboxSelectability(state) {
	configuration.collection.PGNTagList.forEach((setting) => {
		$(setting.switchname).attr('disabled', true);

		if (state) {
			if ($(setting.switchname).prop('disabled')) {
				$(setting.switchname).removeAttr('disabled');
				//confirmOnlyOneOption();
			}
		}
	});
}

/**
 * Toggle the local file value for a specific setting based on checkbox status
 *
 * @param {string} elementname - The name of the checkbox (pre-pend with a #)
 * @param {string} dataname - The key name of the element in local storage
 */
function toggleSetting(elementname, dataname) {
	// Default value
	localStorage.saveItem(dataname, false);

	// Set to "True" if checked
	if ($(elementname).is(':checked')) {
		localStorage.saveItem(dataname, true);
	}
}

export {
	hashString,
	hashJSON,
	shuffle,
	tryCatch,
	wait,
	isSettingEnabled,
	sort_by_key,
	setDisplayAndDisabled,
	setCheckboxSelectability,
	toggleSetting,
	showErrorModal,
};
