const configuration = {
	// Application Information
	app: {
		name: 'Chess PGN Trainer',
		version: '1.13.2',
	},

	// Application defaults (referenced when the "Reset" button is used)
	defaults: {
		light: '#dee3e6',
		dark: '#8ca2ad',
		movecolor: '#cabcb5',
		pieceIndex: '0',
		darkmode: false,
		copy2clipboard: true,
		csvheaders: true,
		legalmoves: true,
		speed: 200,
		circlesarrows: true,
		playAudio: false,
		playSpeech: false,
	},

	// Feature flags for components
	features: {
		annotation: {
			enabled: true,
		},
		audio: {
			enabled: true,
		},
		speech: {
			enabled: true,
		},
		lichess: {
			enabled: true,
		},
		dataStorage: {
			enabled: false,
		},
	},

	// Item Collections
	collection: {
		// Collection of checkboxes used in the app
		checkboxlist: ['#playbothsides', '#playoppositeside', '#randomizeSet', '#flipped', '#manualadvance'],

		// Collection of text elements
		messagelist: ['#puzzlename', '#errors', '#errorRate', '#elapsedTime', '#avgTime'],

		// Collection of PGN tags and their associated switches
		PGNTagList: [
			{ PGNTagName: 'PGNTrainerBothSides', switchname: '#playbothsides' },
			{ PGNTagName: 'PGNTrainerOppositeSide', switchname: '#playoppositeside' },
			{ PGNTagName: 'PGNTrainerRandomize', switchname: '#randomizeSet' },
			{ PGNTagName: 'PGNTrainerFlipped', switchname: '#flipped' },
			{ PGNTagName: 'PGNTrainerNextButton', switchname: '#manualadvance' },
		],

		// Collection of text setting values and their associated text field inputs
		fieldList: [
			{ settingname: 'light', fieldName: '#Light-Color' },
			{ settingname: 'dark', fieldName: '#Dark-Color' },
			{ settingname: 'lichess_userID', fieldName: '#lichess_user_ID' },
			{ settingname: 'lichess_accesstoken', fieldName: '#lichess_app_key' },
		],

		// Collection of checkbox settings and their associated switches
		switchlist: [
			{ settingname: 'copy2clipboard', switchname: '#chk_clipboard' },
			{ settingname: 'csvheaders', switchname: '#chk_csvheaders' },
			{ settingname: 'legalmoves', switchname: '#chk_legalMoves' },
			{ settingname: 'circlesarrows', switchname: '#chk_circlesarrows' },
			{ settingname: 'playAudio', switchname: '#chk_playAudio' },
			{ settingname: 'playSpeech', switchname: '#chk_playSpeech' },
		],

		// Collection of slider settings and their associated sliders
		sliderList: [{ settingname: 'speed', fieldName: '#pieceSpeed' }],
	},

	// Theme details for light/dark modes
	theme: {
		pieceThemePath: '../src/lib/chessboardjs/img/chesspieces/staunty/{piece}.svg',
		// Could also point to a hosted path instead like this:
		// pieceThemePath: 'https://github.com/lichess-org/lila/raw/refs/heads/master/public/piece/alpha/{piece}.svg'
		pieceThemePathRoot: '../src/lib/chessboardjs/img/chesspieces/',

		themeImgRootPath: '../src/components/themes/',
		themeProfiles: [
			{
				themeName: 'light',
				darkmodeSetting: false,
				images: [
					{ ID: 'img_logo', fileName: 'github-mark-black.svg' },
					{ ID: 'img_logo2', fileName: 'github-mark-black.svg' },
					{ ID: 'img_anaylsis', fileName: 'magnifier-black.png' },
				],
			},
			{
				themeName: 'dark',
				darkmodeSetting: true,
				images: [
					{ ID: 'img_logo', fileName: 'github-mark-white.svg' },
					{ ID: 'img_logo2', fileName: 'github-mark-white.svg' },
					{ ID: 'img_anaylsis', fileName: 'magnifier-white.png' },
				],
			},
		],
	},
};

export default configuration;
