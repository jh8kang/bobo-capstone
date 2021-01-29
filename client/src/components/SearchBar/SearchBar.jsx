import React from 'react';
import './SearchBar.scss';

export default function SearchBar(props) {
    return (
        <div className="search">
            <input onChange={props.searchHandler} placeholder="Search Store"className="search__input"/>
            <div className="icon__search"></div>
        </div>
    )
}
