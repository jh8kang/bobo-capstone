import React from 'react';
import './StoreList.scss';
import StoreListItem from '../StoreListItem/StoreListItem';
import {v4 as uuid} from 'uuid';

export default function StoreList({stores, searchStore}) {
    if (searchStore) {
        return <StoreListItem key={uuid()} store={searchStore}/>
    } else if (!stores){
        return <h1>loading...</h1> 
    }
    return (
        <div className="storeList">
            {stores.map(store => {
                return <StoreListItem key={uuid()} store={store}/>
            })}
        </div>
    )
}
