export async function getLogEntries(){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`);
    return response.json();
}