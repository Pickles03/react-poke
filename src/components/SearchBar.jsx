import React from 'react';

function SearchBar({searchTerm, onChange}) {
    return (
        <input
            type='text'
            placeholder='Pokemon name'
            value={searchTerm}
            onChange={onChange}
        />
    );
};

export default SearchBar;