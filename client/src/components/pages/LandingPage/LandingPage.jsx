import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LandingPage extends Component {


    render() {
        return (
            <div>
                <p>landing page</p>
                <Link to="/storelogin">
                    <button value="store" >Store Owner</button>
                </Link>
                <Link to="/home">
                    <button value="collector">Point Collector</button>
                </Link>
            </div>
        )
    }

    
}

export default LandingPage
