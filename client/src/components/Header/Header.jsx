import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <p>BoBo</p>
            <nav className="navbar">
                <Link to="/home">
                    <div className="navbar__item">
                        <div className="logo__home"></div>
                        <p>Home</p>
                    </div>
                </Link>
                {/* <Link to="/user"> */}
                    <div className="navbar__item">
                        <div className="logo__points"></div>
                        <p>My Points</p>
                    </div>
                {/* </Link> */}
                

            </nav>

            
            
        </header>
    )
}
