import axios from 'axios';
// Spotify base url
const baseUrl = "https://api.spotify.com/v1/";

// Generate token via credentials
export const getToken = async () => {
  try {
    const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

    const response = await axios.post(`https://accounts.spotify.com/api/token`,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          'Authorization': `Basic ${btoa(`${clientID}:${client_secret}`)}`,
          'Content-Type': "application/x-www-form-urlencoded",
        }
      }
    )
    console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.log('Error while generating a token', error)
  }
};

// Get new releases
export const newReleases = async ({token}) => {
  try {
    const response = await axios.get(`${baseUrl}browse/new-releases`,
      {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }
    )
    return response.data;
  } catch (error) {
    console.log('Error while getting new release', error)
  }
}
