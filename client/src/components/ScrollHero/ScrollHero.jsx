import React, {Component} from 'react';
import './ScrollHero.scss';

import FeaturedCard from '../FeaturedCard/FeaturedCard';

class ScrollHero extends Component {
    state = {
        featuredStores: [],
    }

    render() {
        return (
            <div className="hero">
                <p className="hero__title">Featured</p>
                <div className="cards">
                    <FeaturedCard/>
                    <FeaturedCard/>
                    <FeaturedCard/>
                    <FeaturedCard/>
                    
                </div>
                
            </div>
        )

    }
}

export default ScrollHero
