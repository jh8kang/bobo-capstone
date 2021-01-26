import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.scss';

class LandingPage extends Component {


    render() {
        return (
            <div className="landing">
                <p className="logo">BOBO</p>
                <div className="buttons">
                    <Link to="/storelogin">
                        <button value="store" >Store Owner</button>
                    </Link>
                    <Link to="/home">
                        <button value="collector">Point Collector</button>
                    </Link>
                </div>
            </div>
        )
    }

    
}

export default LandingPage
