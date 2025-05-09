// --------------------------
// Color conversion functions
// --------------------------

/* eslint linebreak-style: ["error", "unix"] */
/* eslint indent: ["error", "tab", { "SwitchCase": 1 }] */
/* eslint semi-style: ["error", "last"] */
/* eslint semi: ["error"] */

/* eslint no-undef: "error"*/
/* global */

/* eslint no-unused-vars: "error"*/
/* exported */

// ------------
// HEX-specific
// ------------

/**
 * Convert HEX color to HSL
 *
 * @param {string} hex The HEX color representation of the color to convert
 * @returns {object} Object with the HSL values
 */
function HEX2HSL(hex) {
	let hslColor = {};

	// First convert hex to RGB
	let rgbColor = HEX2RGB(hex);

	// Use this info to generate the HSL components and return that
	hslColor.hsl = RBG2HSL(rgbColor.r, rgbColor.g, rgbColor.b);

	return hslColor.hsl;
}

/**
 * Conver HEX to RGB
 *
 * @param {string} hex The HEX color representation of the color to convert
 * @returns {object} Object with the RGB values
 */
function HEX2RGB(hex) {
	// Credit to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		}
		: null;
}

// ------------
// RGB-specific
// ------------

/**
 * Converts color in RGB format into HSL equivalent
 *
 * @param {int} r The red value (0-255)
 * @param {int} g The green value (0-255)
 * @param {int} b The blue value (0-255)
 * @returns {object} Object with the HSL values
 */
function RBG2HSL(r, g, b) {
	// Formula source: https://www.rapidtables.com/convert/color/rgb-to-hsl.html
	let HSLcolor = {};

	r = r / 255;
	g = g / 255;
	b = b / 255;

	let cMax = Math.max(r, g, b);
	let cMin = Math.min(r, g, b);
	let delta = cMax - cMin;

	// Lightness calculation
	let l = (cMax + cMin) / 2;

	// Hue calculation
	let h = 0;
	if (delta !== 0) {
		switch (cMax) {
			case r:
				h = 60 * (((g - b) / delta) % 6);
				break;
			case g:
				h = 60 * ((b - r) / delta + 2);
				break;
			case b:
				h = 60 * ((r - g) / delta + 4);
				break;
		}
	}

	// Adjustment for hue in case conversion puts the value negative
	if (h < 0) {
		h = h + 360;
	}

	// Saturation calculation
	let s = 0;
	if (delta !== 0) {
		s = delta / (1 - Math.abs(2 * l - 1));
	}

	HSLcolor.h = h;
	HSLcolor.s = s;
	HSLcolor.l = l;

	return HSLcolor;
}

/**
 * Converts color in RGB format into HEX equivalent
 *
 * @param {int} r The red value (0-255)
 * @param {int} g The green value (0-255)
 * @param {int} b The blue value (0-255)
 * @returns {string} Textual representation of the color in hex format
 */
function RGB2HEX(r, g, b) {
	// Credit to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Converts color in RGB format from CSS styling into HEX equivalent
 *
 * @param {string} rgb CSS styling of color in RGB format
 * @returns {string} Textual representation of the color in hex format
 */
function CSSRGB2HEX(rgb) {
	// Adapted from https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
	let hexColor = `#${rgb
		.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
		.slice(1)
		.map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
		.join('')}`;

	return hexColor;
}

// ------------
// HSL-specific
// ------------

/**
 * Converts color in HSL format into RGB equivalent
 *
 * @param {float} h The Hue of the color
 * @param {float} s The Saturation of the color
 * @param {float} l The Luminence of the color
 * @returns {object} Object with the RGB equivalent values
 */
function HSL2RGB(h, s, l) {
	//Formula source: https://www.rapidtables.com/convert/color/hsl-to-rgb.html
	let RGBcolor = {};
	let r, g, b;

	let c = s * (1 - Math.abs(2 * l - 1));
	let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	let m = l - c / 2;

	// RGB calcluations
	switch (true) {
		case h >= 0 && h < 60:
			r = c;
			g = x;
			b = 0;
			break;
		case h < 120:
			r = x;
			g = c;
			b = 0;
			break;
		case h < 180:
			r = 0;
			g = c;
			b = x;
			break;
		case h < 240:
			r = 0;
			g = x;
			b = c;
			break;
		case h < 300:
			r = x;
			g = 0;
			b = c;
			break;
		case h < 360:
			r = c;
			g = 0;
			b = x;
			break;
	}

	RGBcolor.r = Math.round((r + m) * 255);
	RGBcolor.g = Math.round((g + m) * 255);
	RGBcolor.b = Math.round((b + m) * 255);

	return RGBcolor;
}

/**
 * Converts color in HSL format into HEX equivalent
 *
 * @param {float} h The Hue of the color
 * @param {float} s The Saturation of the color
 * @param {float} l The Luminence of the color
 * @returns {string} Textual representation of the color in hex format
 */
function HSL2HEX(h, s, l) {
	// Adapted from https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
	s *= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

// ---------------
// Color Utilities
// ---------------

/**
 * Validate that the input is a color in HEX format
 *
 * @param {string} colorvalue The color to validate. If invalid, a default grey color is returned.
 * @returns A properly formatted hex color
 */
function validateHexColor(colorvalue) {
	// Convert all characters to lower case
	colorvalue = colorvalue.toLocaleLowerCase();

	// If the input does not have a # in front, insert one
	if (colorvalue.indexOf('#') < 0) {
		colorvalue = '#' + colorvalue;
	}

	// Ensure that the values are within limits
	var reg = /^#[0-9A-F]{6}$/i;
	if (reg.test(colorvalue) === false) {
		colorvalue = '#808080';
	}

	return colorvalue;
}

/**
 * Takes a color in HEX format and returns an object in a standard format with RGB, HSL, CSS, and HEX values
 *
 * @param {string} hex The color to be processed in HEX format
 * @returns The rendered color object
 */
function renderHEXColor(hex) {
	let color = {};

	// Return color in RGB, HEX, and HSL
	color.rgb = HEX2RGB(hex);
	color.hex = hex;
	color.hsl = HEX2HSL(hex);
	color.cssString = 'rgb(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ')';

	return color;
}

/**
 * Takes a color in RGB format and returns an object in a standard format with RGB, HSL, CSS, and HEX values
 *
 * @param {int} r The red value (0-255)
 * @param {int} g The green value (0-255)
 * @param {int} b The blue value (0-255)
 * @returns The rendered color object
 */
function renderRGBColor(r, g, b) {
	let color = {};

	// Return color in RGB, HEX, and HSL
	color.rgb = { r, g, b };
	color.hex = RGB2HEX(r, g, b);
	color.hsl = RBG2HSL(r, g, b);
	color.cssString = 'rgb(' + r + ',' + g + ',' + b + ')';

	return color;
}

/**
 * Takes a color in HSL format and returns an object in a standard format with RGB, HSL, CSS, and HEX values
 *
 * @param {float} h The Hue of the color
 * @param {float} s The Saturation of the color
 * @param {float} l The Luminence of the color
 * @returns The rendered color object
 */
function renderHSLColor(h, s, l) {
	let color = {};

	// Return color in RGB, HEX, and HSL
	color.rgb = HSL2RGB(h, s, l);
	color.hex = HSL2HEX(h, s, l);
	color.hsl = { h, s, l };
	color.cssString = 'rgb(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ')';

	return color;
}

/**
 * Get the color midway between to source colors
 *
 * @param {*} color1 The HEX color value of the first color to blend
 * @param {*} color2 The HEX color value of the second color to blend
 * @returns The blended color object
 */
function mixTwoColors(color1, color2) {
	let blendedColor = {};

	// Calculate average RGB value between the two original colors, rounded to nearest integer
	let r = Math.round((HEX2RGB(color1).r + HEX2RGB(color2).r) / 2);
	let g = Math.round((HEX2RGB(color1).g + HEX2RGB(color2).g) / 2);
	let b = Math.round((HEX2RGB(color1).b + HEX2RGB(color2).b) / 2);

	// Return color in RGB, HEX, and HSL
	blendedColor = renderRGBColor(r, g, b);

	return blendedColor;
}

/**
 * Returns the complementary color of the provided color
 *
 * @param {string} originalColor The source color in HEX format
 * @returns The color object of the complementary color
 */
function getComplementaryColor(originalColor) {
	let complementary = {};
	let hexcolor = originalColor.toLocaleLowerCase();
	let sourceColor = HEX2RGB(hexcolor);
	let HSLcolor = RBG2HSL(sourceColor.r, sourceColor.g, sourceColor.b);

	// Calculate Complementary Color
	let h = HSLcolor.h - 180; // 180 degrees opposite of the color wheel
	let s = HSLcolor.s;
	let l = HSLcolor.l;

	// Adjustment for hue in case conversion puts the value negative
	if (h < 0) {
		h = h + 360;
	}

	complementary = renderHSLColor(h, s, l);

	return complementary;
}

export { CSSRGB2HEX, renderRGBColor, renderHSLColor, renderHEXColor, mixTwoColors, getComplementaryColor, validateHexColor };
