import React from 'react';
import './SearchBar.scss';

export default function SearchBar({searchHandler}) {
    return (
        <div className="search" >
            <form onSubmit={searchHandler} >
                <input placeholder="Search Store" id="search"className="search__input"/>
            </form>
            <div className="icon__search"></div>
        </div>
    )
}
