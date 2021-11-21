const clientId = "6de057a4f305422c8d456393b4877e18";
const redirectUri = "http://localhost:3000/";
let userAccessToken;

const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        // Get Access Token
        const accessTokenMatch =
            window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // reset access token
            window.setTimeout(() => {
                userAccessToken = "";
            }, expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return userAccessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }

                return jsonResponse.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    };
                });
            });
    },
    searchKinda() {
        const accessToken = Spotify.getAccessToken();
        fetch(`https://api.spotify.com/v1/search?type=track&q=tokyo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }

                return console.log(jsonResponse);
            });
    },
};

export default Spotify;
