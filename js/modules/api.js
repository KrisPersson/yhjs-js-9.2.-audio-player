// API

// const SPOTIFY_END_POINT_URL = "https://api.spotify.com/v1/search"
const SPOTIFY_TOKEN_URL = "https://blooming-reef-63913.herokuapp.com/api/token"


async function getSpotifyToken(URL) {

    try {
        const response = await fetch(URL)
        const data = await response.json()
        return data.token
    } catch (error) {
        console.log(error)
    }
}

export { SPOTIFY_TOKEN_URL, getSpotifyToken }