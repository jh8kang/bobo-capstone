import React from 'react';
import './FeaturedCard.scss';
import store1 from '../../assets/images/store1.jpg';

export default function FeaturedCard() {
    return (
        <div className="card">
            <div className="card__imgBox">
                <img className="card__img"src={`${store1}`} alt="store profile"/>
            </div>
            <p className="card__name">Boba shop name</p>
        </div>
    )
}
