import logo from '../logo.svg';
import './App.css';
import SearchBar from '../features/searchBar/SearchBar.js'
import SearchResults from '../features/searchResults/SearchResults.js'
import Playlist from '../features/playlist/Playlist.js'
import { useState, useEffect } from 'react'
import { Auth } from '../util/auth.js'

function App() {
  const [ searchResults, setSearchResults ] = useState([])
  const [ playlistTracks, setPlaylistTracks ] = useState([])
  /*const [ playlistName, setPlaylistName ] = useState('ttt')*/
  
  useEffect(() => {
    const hash = window.location.hash
    let runningTimeout = Auth.storeAccessToken(hash)
    console.log('useEffectHash', window.location.hash)
    window.location.hash = ''
    
    return () => {clearTimeout(runningTimeout)}
  }, [])
  
  const searchTrack = async function (searchTerm) {
    console.log('searchTrack', searchTerm)
    const results = await Auth.search(searchTerm)
    console.log('results', results)
    const newSearchResults = results.map((result) => ({name: result.name, artist: result.artists[0].name, album: result.album.name, uri: result.uri, id: result.id}))
    setSearchResults(newSearchResults)
  }
  
  const playlistRemoveHandler = (track) => { 
    const updatedPlaylistTracks = playlistTracks.filter((playlistTrack) => playlistTrack.id != track.id)
    setPlaylistTracks(updatedPlaylistTracks)
  }
  
  const searchAddHandler = (track) => {
    const trackInPlaylist = playlistTracks.some((playlistTrack) => playlistTrack.id == track.id)
    if(!trackInPlaylist) {
      setPlaylistTracks((prevPlaylistTracks) => [...prevPlaylistTracks, track])
    }
  }
  
  const savePlaylist = async (playlistName) => {
    const tracksUris = playlistTracks.map((track) => track.uri)
    await Auth.savePlaylist(playlistName, tracksUris)
    setPlaylistTracks([])
  }
  
  return (
    <>
      <header className='header'>
        <h1>Music App</h1>
      </header>
      <main className='main'>
        <search>
          <SearchBar onSearch={searchTrack} />
        </search>
        <section className='results_Playlist'>
          <SearchResults results={searchResults} onAdd={searchAddHandler} />
          <Playlist playlistTracks={playlistTracks} onRemove={playlistRemoveHandler} onSave={savePlaylist} />
        </section>
      </main>
      <footer className='footer'>
        <ul className='footer-list'>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
      </footer>
    </>
    /*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/
    
  );
}

export default App;
