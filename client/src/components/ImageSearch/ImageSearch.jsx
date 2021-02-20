import React, {useState, useEffect} from 'react';
import './ImageSearch.scss';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

export default function ImageSearch({showImageSearch, closeSearch, reloadPage, onPhotoChangeSearch}) {
    const showHideClassName = showImageSearch ? "image-search display" : "image-search display-out";
    let [searchTerm, setSearchTerm] = useState("hi");
    let [imageList, setImageList] = useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:8080/photos/nature`)
        .then(res => {
            console.log(res.data)
            setImageList(res.data);
        })
    }, []) 


    let searchHandler = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.imageSearch.value);
        axios.get(`http://localhost:8080/photos/${e.target.imageSearch.value}`)
        .then(res => {
            // console.log(res.data)
            setImageList(res.data);
        })
        reloadPage()
    }

    let imageClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        onPhotoChangeSearch(e);
        closeSearch();
    }


    return (
        <div className={showHideClassName}>
            <form onSubmit={searchHandler} className="image-search__form" id="imageSearch">
                <input type="text" className="image-search__input" placeholder="search image" name="imageSearch"/>
            </form>
            <div className="images">
                {imageList.map((image)=> <img src={image.urls.raw} className="images__card" id={image.urls.raw} key={uuid()} onClick={imageClick}/>)}
            </div>
            <div className="image-search__button-container">
                <button onClick={closeSearch} className="image-search__button">close</button>
            </div>
        </div>
    )
}
