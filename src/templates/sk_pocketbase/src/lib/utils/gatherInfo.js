// Get IP Address

// Get User Agent
const getUserAgent = () => {
	return { userAgent: navigator.userAgent };
};

// Get Referrer
const getReferrer = () => {
	return { referrer: document.referrer };
};

// Get Language Preferences
const getLanguagePreferences = () => {
	return { languagePreferences: navigator.languages || [navigator.language] };
};

// Get Screen Resolution
const getScreenResolution = () => {
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;
	return { screenResolution: `${screenWidth}x${screenHeight}` };
};

// Get Device Information
const getDeviceInfo = () => {
	const deviceType = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile/.test(navigator.userAgent)
		? 'Mobile'
		: 'Desktop';
	return { deviceType };
};

// Get Browser Features
const getBrowserFeatures = () => {
	const features = {
		cookiesEnabled: navigator.cookieEnabled,
		javascriptEnabled: typeof navigator.javaEnabled === 'function' && navigator.javaEnabled(),
		online: navigator.onLine
	};
	return { browserFeatures: features };
};
const getOS = () => {
	return { operatingSystem: navigator.platform };
};

// Call the functions to gather information and create a JSON object
export const gatherInfo = async () => ({
	...getUserAgent(),
	...getReferrer(),
	...getLanguagePreferences(),
	...getScreenResolution(),
	...getDeviceInfo(),
	...getBrowserFeatures(),
	...getOS()
});
