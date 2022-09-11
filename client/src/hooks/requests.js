async function httpGetPlanets() {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/planets`);
	const data = await response.json();
	return data;
}

async function httpGetLaunches() {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/launches`);
	const data = await response.json();
	return data.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
