import React, {useState, useEffect} from 'react';
import './ImageSearch.scss';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

export default function ImageSearch({showImageSearch, closeSearch, reloadPage}) {
    const showHideClassName = showImageSearch ? "image-search display" : "image-search display-out";
    let [searchTerm, setSearchTerm] = useState("hi");
    let [imageList, setImageList] = useState([]);
    console.log(showImageSearch)
    console.log(showHideClassName)


    let searchHandler = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.imageSearch.value);
        axios.get(`http://localhost:8080/photos/${e.target.imageSearch.value}`)
        .then(res => {
            console.log(res.data)
            setImageList(res.data);
        })
        reloadPage()
    }


    return (
        <div className={showHideClassName}>
            <form onSubmit={searchHandler} className="image-search__form" id="imageSearch">
                <input type="text" className="image-search__input" placeholder="search image" name="imageSearch"/>
            </form>
            <div className="images">
                {imageList.map((image)=> <img src={image.urls.raw} className="images__card" key={uuid()}/>)}
            </div>
            <button onClick={closeSearch}>close</button>
        </div>
    )
}
