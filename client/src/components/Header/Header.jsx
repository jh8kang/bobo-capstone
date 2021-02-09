import React, {useState, useEffect} from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import {db, auth} from '../../firebase';
import defaultImage from '../../assets/icons/profile.svg';


export default function Header({fileUrl, userInfo}) {

    // variables 
    let imageUrl;

    // sets default image to store profile page
    if (userInfo.image) {
        imageUrl = userInfo.image
    } else if (fileUrl) {
        imageUrl = fileUrl
    } else {
        imageUrl = defaultImage
    }

    if (userInfo.name) {
        return (
            <header className="header">
                <img className="header__image"src={imageUrl}/>
                <p className="header__user">Hi {userInfo.name}</p>
            </header>
        )
    }
    return <p></p>

}
