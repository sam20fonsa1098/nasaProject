const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets?isHabitable=true`);
  const data = await response.json();
  return data;
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const data = await response.json();
  return data;
}

async function httpSubmitLaunch(launch) {
  console.log(launch)
  await fetch(`${API_URL}/launches`, {
    method: "POST",
    body: JSON.stringify({
      ...launch,
      customers: ["samuel"],
      upcoming: true,
      success: true
    }),
    headers: {
      'Content-Type': "application/json"
    }
  });
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};