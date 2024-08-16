const clientId = 'cfd6106d557f45cea680b08941bd531c'
const redirectUri = 'https://jbhnd.github.io/music-rs/'
const responseType = 'token'
const scope = 'playlist-modify-private'
const showDialog = true
const baseUrl = 'https://accounts.spotify.com'
let accessToken = ''
let runningTimeout = ''

const Auth =  {
    storeAccessToken(hash) {
        console.log('accessTokenBegn', accessToken)
        if(hash.length > 1 && !accessToken) {
            const hashArray = hash.substring(1).split('&')
            const newAccessToken = hashArray.find(elem => elem.startsWith('access_token')).split('=')[1]
            const expiresIn = hashArray.find(elem => elem.startsWith('expires_in')).split('=')[1]
            console.log('store', hashArray, newAccessToken, expiresIn)
            
            accessToken = newAccessToken
        }
        return window.setTimeout(() => {
            accessToken = ''
            console.log('setTimeout', accessToken)
        }, 3600*1000)
        console.log('accessTokenEn', accessToken)
    },
    
    getAccessToken() {
        if(accessToken) {
            console.log('ifAccessToken', accessToken)
            return accessToken
        }
        
        console.log('ifNotAccessToken', accessToken)
        const loginUrl = `${baseUrl}/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=${showDialog}`
        window.location = loginUrl
    },

    search(searchTerm) {
        this.getAccessToken()
            console.log('searchAccessToken', accessToken)
            return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                cache: 'no-store'
            })
            .then((response) => response.json())
            .then((resultObj) => {
                console.log('resultObj', resultObj)
                if(resultObj.tracks){
                    return resultObj.tracks.items
                }
                else {
                    return []
                }
            })
            .catch((e) => {
                console.log(e)
                return []
            })
    },
        
    getUserId() {
        return fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then((response) => response.json())
          .then((resultObj) => {
            console.log('getUserIdResultObj', resultObj)
            if(resultObj.id) {
                return resultObj.id
            }
            else {
                return ''
            }
          })
    },

    createPlaylist(userId, playlistName) {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            // body: '{\n    "name": "New Playlist",\n    "description": "New playlist description",\n    "public": false\n}',
            body: JSON.stringify({
              'name': `${playlistName}`,
              'description': 'New playlist description',
              'public': false
            })
          })
          .then((response) => response.json())
          .then((resultObj) => {
            console.log('createPlaylistResponseObj', resultObj)
            if(resultObj.id) {
                return resultObj.id
            }
            else {
                return ''
            }
          })
    },

    addTracks(playlistId, trackUris) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            // body: '{\n    "uris": [\n        "string"\n    ],\n    "position": 0\n}',
            body: JSON.stringify({
              'uris': trackUris,
              'position': 0
            })
          });
    },

    async savePlaylist(playlistName, tracksUris) {
        if(!accessToken) {
            this.getAccessToken()
        }
        const userId = await this.getUserId()
        const playlistId = await this.createPlaylist(userId, playlistName)
        this.addTracks(playlistId, tracksUris)
    }
}

export { Auth }