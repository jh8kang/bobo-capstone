import React from 'react';
import './ScrollHero.scss';
import FeaturedCard from '../FeaturedCard/FeaturedCard';
import {v4 as uuid} from 'uuid';

// compare compares the length of the users array in objects a and b
function compare(a, b) {
    if (a.users.length > b.users.length) {
        return -1;
    }
    if (a.users.length < b.users.length) {
        return 1;
    }
    return 0;
}

function ScrollHero({stores, pageLoadHandler}) {

// variables
    let storesList = [];

// sorts stores list into 5 stores with most users
    if (stores) {
        let list = stores;
        list.sort(compare);
        let newList=[];
        for(let i = 0; i < 5; i++) {
            newList.push(list[i])
        }
        storesList = newList;
    } 

    if (storesList) {
        return (
            <div className="hero">
                <p className="hero__title">Featured</p>
                <div className="cards">
                    {storesList.map(store => {
                        return <FeaturedCard store={store} key={uuid()}/>
                    })}  
                </div>
            </div>
        )
    }
    return <p>loading</p>
}

export default ScrollHero
