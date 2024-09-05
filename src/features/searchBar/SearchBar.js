import { useState } from 'react'

function SearchBar({onSearch}) {
    const [ searchInput, setSearchInput ] = useState('')
    
    const handleSearchInput = (e) => {
        e.preventDefault()
        console.log('handleSearch', searchInput)
        setSearchInput(e.target.value)
    }
    
    const handleSearch = (e) => {
        e.preventDefault()
        console.log('searchInput', searchInput)
        onSearch(searchInput)
    }
    
    return (
        <form className='searchBar'>
            <input type='text' value={searchInput} onChange={handleSearchInput} />
            <button onClick={handleSearch} className='button'>Search</button>
        </form>
    )
}

export default SearchBar