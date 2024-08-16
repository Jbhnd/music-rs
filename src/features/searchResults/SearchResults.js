import React from 'react'
import Track from '../tracks/Track'
import Tracklist from '../tracks/Tracklist.js'

function SearchResults({results, onAdd}) {
    console.log('searchResults', results)
    return (
        <form className='results'>
            <p className='heading'>Results</p>
            <Tracklist tracks={results} onAdd={onAdd} buttonText={'+'} />
            {/*results.map((result) => (
                <div className='trackBox'>
                    <Track track={result} />
                    <button onClick={onClickHandler(result)}>Add</button>
                </div>)
            )*/}
        </form>
    )
}

export default SearchResults