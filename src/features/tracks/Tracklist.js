import React from 'react'
import Track from './Track.js'

function Tracklist({tracks, onAdd, onRemove, buttonText}) {
    return tracks.map((track) => <Track track={track} onAdd={onAdd} onRemove={onRemove} buttonText={buttonText} />)
}

export default Tracklist