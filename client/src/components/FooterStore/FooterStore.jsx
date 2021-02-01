import React from 'react';
import './FooterStore.scss';
import {Link} from 'react-router-dom';

export default function FooterStore() {
    return (
        <footer>
            <Link to="/home/store"><div className="icon__home"></div> </Link>
            <Link><div className="icon__camera"></div></Link>
            <Link to="/store/profile"><div className="icon__profile"></div></Link>
        </footer>
    )
}
