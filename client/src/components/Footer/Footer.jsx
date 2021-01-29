import React from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <Link to="/home"><div className="icon__home"></div> </Link>
            <Link to="/points"><div className="icon__star"></div></Link>
            <Link to ="/home/user/qr"><div className="icon__qr"></div></Link>
            <Link to="/user/profile"><div className="icon__profile"></div></Link>
        </footer>
    )
}
