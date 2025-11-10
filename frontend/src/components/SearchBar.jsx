import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState(''); // Local state to track the search input
    const navigate = useNavigate(); // React Router hook for navigation

    // Handle form submit event
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form reload
        const trimmed = query.trim(); // Remove extra spaces
        
        if(!trimmed) return; // Stop if the input is empty
        
        navigate(`/browse?q=${encodedURIComponent(trimmed)}`);
    };

    return (
        <form 
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <input
                type="search"
                placeholder="Search movies, shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}   // Update state as user types
                aria-label="Search movies or shows"
                style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    width: 220,
                    outline: 'none',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #222',
                    backgroundColor: '#111',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;