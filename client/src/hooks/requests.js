async function httpGetPlanets() {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/planets`);
	const data = await response.json();
	return data;
}

async function httpGetLaunches() {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/launches`);
	const data = await response.json();
	return data.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	try {
		return await fetch(`${process.env.REACT_APP_API_URL}/v1/launches`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(launch),
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

async function httpAbortLaunch(id) {
	try {
		return await fetch(`${process.env.REACT_APP_API_URL}/v1/launches/${id}`, {
			method: 'DELETE',
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
