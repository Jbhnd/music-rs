import React from 'react'

function Track({track, onAdd, onRemove, buttonText}) {
    console.log('track', track, 'onAdd', onAdd, 'onRemove', onRemove)
    const { name, artist, album } = track
    
    const handleAdd = (e) => {
        e.preventDefault()
        onAdd(track)
    }
    
    const handleRemove = (e) => {
        e.preventDefault()
        onRemove(track)
    }
    console.log('trackname', name, 'trackartist', artist)
    return (
        <div className='track'>
            <p><span className='name'>{name}</span><br />
               <span className='artist_album'>{artist} | {album}</span></p>
            <button className='track_button' onClick={onAdd ? handleAdd : handleRemove}>{buttonText}</button>
        </div>
    )
}

export default Track