/* exported themeDetails */

const themeDetails = [
	{
		themeName: 'light',
		darkmodeSetting: '0',
		imgRootPath: './img/themes/',
		checkboxState: false,
		images: [
			{ID: 'img_logo', fileName: 'github-mark-black.svg'},
			{ID: 'img_logo2', fileName: 'github-mark-black.svg'},
			{ID: 'img_anaylsis', fileName: 'magnifier-black.png'},
		],
	},
	{ 
		themeName: 'dark',
		darkmodeSetting: '1',
		imgRootPath: './img/themes/',
		images: [
			{ID: 'img_logo', fileName: 'github-mark-white.svg'},
			{ID: 'img_logo2', fileName: 'github-mark-white.svg'},
			{ID: 'img_anaylsis', fileName: 'magnifier-white.png'},
		],
		checkboxState: true
	}
];