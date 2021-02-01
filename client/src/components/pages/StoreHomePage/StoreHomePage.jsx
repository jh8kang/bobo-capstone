import React from 'react';
import './StoreHomePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import StoreHero from '../../StoreHero/StoreHero';

export default function StoreHomePage() {
    return (
        <div>
            <StoreHero />
            <FooterStore/>
        </div>
    )
}
