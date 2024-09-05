import React from 'react'
import Track from '../tracks/Track.js'
import Tracklist from '../tracks/Tracklist.js'
import { useState } from 'react'

function Playlist({playlistTracks, onRemove, onSave}) {
    const [ playlistName, setPlaylistName ] = useState('')
    
    const handleUserInput = (e) => {
        e.preventDefault()
        setPlaylistName(e.target.value)
    }
    
    function handleSave(e) {
        e.preventDefault()
        onSave(playlistName)
    }
    
    return (
        <form className='playlist' onSubmit={handleSave} >
            <input className='heading' type='text' placeholder='Playlist Name' value={playlistName} onChange={handleUserInput} required />
            <Tracklist tracks={playlistTracks} onRemove={onRemove} buttonText={'-'} />
            <button type='submit' className='button'>Save To Spotify</button>
            {/*playlistTracks.map((result) => (
                <div className='trackBox'>
                    <Track track={result} />
                    <button onClick={onClickHandler(result)}>Remove</button>
                </div>)
            )*/}
        </form>
    )
}

export default Playlist