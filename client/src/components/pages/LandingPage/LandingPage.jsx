import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.scss';
import bobaImage from '../../../assets/images/boba.svg';

class LandingPage extends Component {
    render() {
        return (
            <div className="landing">
                <p className="landing__logo">BOBO</p>
                <div className="landing__main">
                    <img className="landing__main__image" src={bobaImage} alt="boba"/>
                    <div className="buttons">
                        <Link to="/login">
                            <button className="buttons__store" value="store" >Store Owner</button>
                        </Link>
                        <Link to="/login">
                            <button className="buttons__store" value="collector">Point Collector</button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }    
}

export default LandingPage
