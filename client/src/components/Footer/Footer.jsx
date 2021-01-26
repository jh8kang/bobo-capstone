import React from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <Link to="/home">
                <div className="icon__home"></div> 
            </Link>
           
            <div className="navBox">
                <div className="icon__star"></div>
            </div>
            <Link to ="/home/user/qr">
                <div className="icon__qr"></div>
            </Link>
       
            <div className="navBox">
                <div className="icon__profile"></div>
            </div>
        </footer>
    )
}
