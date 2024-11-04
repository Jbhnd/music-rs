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
        <form className='searchBar' onSubmit={handleSearch}>
            <input type='search' className='input' placeholder='Track title or artist' aria-label='search' value={searchInput} onChange={handleSearchInput} />
            <input type='submit' value='Search' className='button' />
        </form>
    )
}

export default SearchBar