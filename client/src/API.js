export async function getLogEntries(){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry) {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-KEY': apiKey, 
      },
      body: JSON.stringify(entry),
    });
    let json;
    if (response.headers.get('content-type').includes('text/html')) {
      const message = await response.text();
      json = {
        message,
      };
    } else {
      json = await response.json();
    }
    if (response.ok) {
      return json;
    }
    const error = new Error(json.message);
    error.response = json;
    throw error;
  }