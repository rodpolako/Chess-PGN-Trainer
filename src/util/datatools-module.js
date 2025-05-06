// -----------------------
// Local stoarge Functions
// -----------------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global localStorage */

/* eslint no-unused-vars: "error"*/
/* exported */

/**
 * Save a key/value pair to local storage
 * 
 * @param {string} key - The name of the key
 * @param {string} value - The value of the key
 */
function saveItem(key, value) {
	localStorage.setItem(key, value);
}

/**
 * Read the value of a specific key from local storage
 * 
 * @param {String} key - The key name for which the value is to be read
 * @returns {string}
 */
function readItem(key) {
	let value = localStorage.getItem(key);
	return value;
}

/**
 * Deletes the specified key from local storage
 * 
 * @param {string} key - The key to delete
 */
function deleteItem(key) {
	localStorage.removeItem(key);
}

/**
 * Clear all items in local storage
 */
function clearItems() {
	localStorage.clear();
}

export { saveItem, readItem, deleteItem, clearItems };
