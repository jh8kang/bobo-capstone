import React from 'react';
import './SearchBar.scss';

export default function SearchBar() {
    return (
        <div className="search">
            <input placeholder="Search Store"className="search__input"/>
            <div className="icon__search"></div>
            
        </div>
    )
}
