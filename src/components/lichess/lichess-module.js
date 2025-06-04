/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global $, document, fetch, console,  */

/* eslint no-unused-vars: "error"*/
/* exported */

// Required imports
import { parse } from '../../lib/pgn-parser/pgn-parser-1.4.18-esm-min.js';
import * as sharedTools from '../../util/shared-tools-module.js';
import * as dataTools from '../../util/datatools-module.js';
import configuration from '../../app/config.js';
import { resetGame, postPGNReadSetup } from '../../app/chess-pgn-trainer.js';

// Global variables
let userID;
let lichessToken;

/**
 * Check to see if the Lichess user ID exists
 *
 * @returns {response} The API response when the query is executed
 */
async function checkUserIDExists() {
	let response;

	try {
		response = await fetch('https://lichess.org/api/user/' + dataTools.readItem('lichess_userID'), { cache: 'no-store' });
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
}

/**
 * Return data from Lichess API
 *
 * @param {text} fetchURL The target URL of the API call
 * @param {boolean} usePAT Indicates whether or not to use a PAT (as part of the authorization header)
 * @returns
 */
async function fetchLichessData(fetchURL, studyID) {
	//, usePAT = true
	const headers = {
		Authorization: 'Bearer ' + lichessToken,
	};

	let response;

	try {
		response = await fetch(fetchURL, { headers: headers, cache: 'no-store' });

		// This will happen if the study permission for "Share and Export" is set to "Nobody"
		if (response.status === 403) {
			forbidden(studyID);
			return false;
		}

		// Wrong PAT supplied - Returns 401 (Unauthorized)
		if (response.status === 401) {
			incorrectPAT();
			return false;
		}

		// Too many Requests - Returns 429 (Too Many Requests)
		if (response.status === 429) {
			tooManyRequests();
			return false;
		}

		// Return any other unknown error
		if (response.status !== 200) {
			console.log(response);
			sharedTools.showErrorModal(await response.text());
			$('#lichess_close').click();
			removeLoadingSpinner();
			return false;
		}

		let responseText = await response.text();
		return responseText;
	} catch (error) {
		console.log(error);
		return error;
	}
}

/**
 * Formats JSON object to include chapter data
 *
 * @param {object} PGNData JSON object of PGN data from the pgn-parser
 * @returns {object} JSON object with chapter information
 */
function extractStudyChapterData(PGNData) {
	let study = {};

	study.studyName = PGNData[0].tags.StudyName;
	study.studyID = PGNData[0].tags.ChapterURL.split('/').at(-2);
	study.chapters = [];

	PGNData.forEach((chapter) => {
		var chapterdata = {};
		chapterdata.name = chapter.tags.ChapterName;
		chapterdata.source = chapter.tags.ChapterURL;
		chapterdata.id = chapter.tags.ChapterURL.split('/').at(-1);
		chapterdata.studyURL = chapter.tags.ChapterURL.replace('lichess.org/study', 'lichess.org/api/study') + '.pgn';

		study.chapters.push(chapterdata);
	});

	return study;
}

/**
 * Return a list of the chapters for a given Lichess study
 *
 * @param {text} studyID The lichess study ID
 * @returns {object} The list of chapters
 */
async function fetchStudyChapterListing(studyID) {
	let studyURL = 'https://lichess.org/api/study/' + studyID + '.pgn?comments=false&variations=false&clocks=false&source=true';
	let studayData = await fetchLichessData(studyURL, studyID);

	if (studayData === false) {
		return false;
	}

	let pgndata = parse(studayData);

	return extractStudyChapterData(pgndata);
}

function incorrectPAT() {
	let errorMessage = 'Lichess Personal Access Token (PAT) incorrect<br><br>';
	errorMessage += "If you haven't created a token yet, please visit this page to generate a token:<br>";
	errorMessage +=
		'<a href="https://lichess.org/account/oauth/token/create?scopes[]=study:read&description=Chess+PGN+Trainer+Token" target="_blank">https://lichess.org/account/oauth/token/create</a> ';
	errorMessage += '<br><br>';
	errorMessage += 'Make sure you have "Read private studies and broadcasts" enabled when you generate the token.<br><br>';
	errorMessage += '<img src="./src/components/lichess/pat.png">';
	errorMessage += '<br>Once you have the token, copy & paste it into settings and then try again.';
	errorMessage +=
		'<br><br>Note: This is only required to access unlisted and private studies. Leave this field blank if you only are accessing public studies.';

	sharedTools.showErrorModal(errorMessage);
}

function forbidden(studyID) {
	// 403 error - Export permission on the study is set to Nobody

	let errorNotification =
		'Access to this study is denied. In Lichess, go to the options for this study and make sure that "Share & export" is NOT set to "Nobody"';

	$('#' + studyID + '_list').empty();

	createAccordianEntry('#' + studyID + '_list', errorNotification, '');
}

function tooManyRequests() {
	let errorMessage = 'Too many requests.  Please wait 60 seconds and then try again.';

	sharedTools.showErrorModal(errorMessage);
}

/**
 * Returns list of studies for a given user ID
 *
 * @param {text} userID The userID to use for study listing
 * @returns {object} The list of studies for this user
 */
async function getStudiesListing(userID) {
	// Add the user ID to the modal title
	$('#lichess_study_owner').empty();
	$('#lichess_study_owner').append(': ' + userID);

	var ndjson = await fetchLichessData('https://lichess.org/api/study/by/' + userID);

	if (ndjson === false) {
		//$('#lichess_close').click();
		removeLoadingSpinner();
		return [];
	}

	// Adapted from https://gist.github.com/yaggytter/f74feeede736c8161bd0eee225a161b4 to convert NDJSON to Array of JSON
	var json = '[' + ndjson.replace(/\r?\n/g, ',').replace(/,\s*$/, '') + ']';
	var jsondata = JSON.parse(json);

	return jsondata;
}

/**
 * Verify there is a userID provided in the settings modal before making any other calls
 *
 * @returns
 */
async function validateUserAccess() {
	// Read the credentials values if not already loaded
	if (userID === undefined) {
		initalizeLichess();
	}

	// Exit if userID is blank
	if (userID === '' || userID === undefined) {
		return false;
	}

	// Exit if userID is not valid
	let userDetails = await checkUserIDExists();

	// Determine if user exists, exit early if not present
	if (userDetails.status === 404) {
		//sharedTools.showErrorModal('Lichess user not found. Please check your entry in settings and try again.');
		//$('#lichess_close').click();
		$('#lichess_study_owner').empty();
		$('#lichess_study_owner').append(': ' + userID + ' not found');
		removeLoadingSpinner();
		return false;
	}

	return true;
}

/**
 * Access the Lichess API and populate the modal with the results
 *
 * @returns
 */
async function accessLichessAPI() {
	var validUser = await validateUserAccess();

	if (!validUser) {
		return;
	}

	// Add the user ID to the modal title
	$('#lichess_study_owner').empty();
	$('#lichess_study_owner').append(': ' + userID);

	// clear the existing list first
	$('#lichess_studies_list').empty();

	// Add a loading message
	showLoadingSpinner('#lichess_studies_div');

	// Get the list of studies available for this user (First call)
	let studyListing = await getStudiesListing(userID);

	// Show message in case there are no studies for this user
	if (studyListing.length === 0) {
		createAccordianEntry('#lichess_studies_list', 'No studies available', '');
		removeLoadingSpinner();
		return;
	}

	// Sort the list alphabetically
	sharedTools.sort_by_key(studyListing, 'name'); // This is the default

	// Other options
	//sharedTools.sort_by_key(studyListing, 'name', false); Reverse alphabetical
	//sharedTools.sort_by_key(studyListing, 'createdAt');
	//sharedTools.sort_by_key(studyListing, 'createdAt', false);
	//sharedTools.sort_by_key(studyListing, 'updatedAt');
	//sharedTools.sort_by_key(studyListing, 'updatedAt', false);

	// Populate the list (studies only)
	await studyListing.forEach(async (workspace) => {
		createListOfStudies(workspace);
	});

	removeLoadingSpinner();
}

/**
 * Populate the studies modal with a list of studies
 *
 * @param {*} entryName
 */
function createListOfStudies(entryName) {
	let element = $('<div/>', {
		class: 'accordion-item',
		id: entryName.id + '_accordianItem',
	});

	$('#lichess_studies_list').append(element);

	element = $('<h2/>', {
		class: 'accordion-header',
		id: entryName.id + '_header',
	});
	$('#' + entryName.id + '_accordianItem').append(element);

	element = $('<button/>', {
		class: 'accordion-button collapsed',
		type: 'button',
		id: entryName.id + '_button',
		'data-bs-toggle': 'collapse',
		'data-bs-target': '#' + entryName.id + '_study',
		'aria-expanded': 'false',
		'aria-controls': entryName.id + '_study',

		text: entryName.name,
	});
	$('#' + entryName.id + '_header').append(element);

	element = $('<div/>', {
		id: entryName.id + '_div',
	});
	$('#' + entryName.id + '_button').append(element);

	element = $('<div/>', {
		id: entryName.id + '_study',
		class: 'accordion-collapse collapse',
		'data-bs-target': '#lichess_studies_list',
	});
	$('#' + entryName.id + '_accordianItem').append(element);

	element = $('<div/>', {
		class: 'accordion-body',
		id: entryName.id + '_body',
	});
	$('#' + entryName.id + '_study').append(element);

	element = $('<div/>', {
		class: 'list-group',
		id: entryName.id + '_list',
	});
	$('#' + entryName.id + '_body').append(element);

	// Add event listener to load the chapters when a study is clicked
	$('#' + entryName.id + '_header').on('click', async function () {
		// Only do this when the item is collapsed
		// The class changes AFTER the click event so I need to look for the opposite
		if ($('#' + entryName.id + '_button').hasClass('collapsed') !== true) {
			showLoadingSpinner('#' + entryName.id + '_div');
			await addChaptersToStudyList(entryName.id);
			removeLoadingSpinner();
		}
	});
}

/**
 * Show a loading spinner next to an indicated object
 *
 * @param {text} id The ID of the object
 */
function showLoadingSpinner(id) {
	// Remove any currently showing spinner if present
	removeLoadingSpinner();

	// Add the new spinner
	let span1 = $('<span/>', {
		html: '&nbsp;',
		id: 'loading',
	});

	let span2 = $('<span/>', {
		class: 'spinner-border spinner-border-sm',
		'aria-hidden': 'true',
	});

	$(id).append(span1);

	$('#loading').append(span2);
}

/**
 * Remove any currently displayed spinners
 */
function removeLoadingSpinner() {
	$('#loading').remove();
}

/**
 * Creates an entry in the specified accordian list
 *
 * @param {text} list The ID of the accordian list to append the new entry
 * @param {text} title The title of the entry
 * @param {text} id The ID of the entry
 */
function createAccordianEntry(list, title, id) {
	let buttonDetails = $('<button/>', {
		text: title,
		id: id,
		class: 'list-group-item list-group-item-action',
	});

	$(list).append(buttonDetails);
}

/**
 * Attach the required custom events to a created entry in the accordian list
 *
 * @param {text} id The ID of the entry to append the events
 * @param {text} url The URL of the study to append
 */
function addCustomEvent(id, url) {
	$(id).on('click', async function () {
		showLoadingSpinner(id);
		let chapterData = await loadChosenLichessChapter(url);
		resetGame();
		$(this).blur();
		$('#lichess_close').click();
		postPGNReadSetup(chapterData);
		removeLoadingSpinner();
	});
}

/**
 * Add the individual chapters to a given study
 *
 * @param {text} studyID The ID of the study
 * @returns
 */
async function addChaptersToStudyList(studyID) {
	// Get list of chapters for indicated study
	let workspaceDetails = await fetchStudyChapterListing(studyID);

	if (workspaceDetails === false) {
		return;
	}

	// Empty the current list of studies
	$('#' + studyID + '_list').empty();

	// Add entry at top of the list in order to load entire study (not just a chapter)
	createAccordianEntry('#' + workspaceDetails.studyID + '_list', 'This entire study', studyID);

	// Add event handler to trigger the puzzle on click.
	addCustomEvent('#' + studyID, 'https://lichess.org/api/study/' + studyID + '.pgn');

	// Add an entry in the list for each chapter of the study
	workspaceDetails.chapters.forEach((chapter) => {
		createAccordianEntry('#' + workspaceDetails.studyID + '_list', chapter.name, chapter.id);

		// Add event handler to trigger the puzzle on click.
		addCustomEvent('#' + chapter.id, chapter.studyURL);
	});
}

/**
 * Load the specified PGN from lichess
 *
 * @param {*} url
 * @returns
 */
async function loadChosenLichessChapter(url) {
	var chosenData = await fetchLichessData(url);

	return chosenData;
}

/**
 * Initialize the Lichess functionality
 * Validates that there is a userID at a minimum before the lichess button is visible
 *
 * @returns
 */
function initalizeLichess() {
	if (configuration.features.lichess.enabled === false) {
		return;
	}

	// Display and enable Lichess options in the settings modal
	sharedTools.setDisplayAndDisabled(['#setting_Lichess'], 'inline-block', false);

	userID = dataTools.readItem('lichess_userID');
	lichessToken = dataTools.readItem('lichess_accesstoken');

	// Disable load studies button by default
	$('#ĺoad_lichess_studies').prop('disabled', true);

	// Exit if userID is blank
	if (userID === '' || userID === undefined || userID === null) {
		console.log('no user found, stopping init');
		// clear the existing list first
		$('#lichess_studies_list').empty();
		$('#lichess_study_owner').empty();

		// Disable the accordion item (will hang browser otherwise)
		$('#lichess_studies_button').prop('disabled', true);
		return;
	}

	// Remove any currently showing spinner if present
	removeLoadingSpinner();

	// Update the UI based on values being provided for Lichess access
	$('#ĺoad_lichess_studies').prop('disabled', false);
	$('#lichess_studies_button').prop('disabled', false);

	// Clear any already loaded content
	$('#lichess_studies_list').empty();
}

/**
 * Initialze the module once the page is loaded
 */
$(document).ready(function () {
	initalizeLichess();
});

export { accessLichessAPI, initalizeLichess };
