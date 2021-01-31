import React, {useState, useEffect} from 'react';
import './StoreHero.scss';
import {db, auth} from '../../firebase';

export default function StoreHero(props) {
    let [storeInfo, setStoreInfo] = useState({});

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setStoreInfo(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))
    }, [])

    if (storeInfo.users) {
        return (
            <div className="store-hero">
                <p className="store-hero__header">Logged in as {storeInfo.username}</p>
                <p className="store-hero__name">{storeInfo.name}</p>
                <p className="store-hero__collector-count">{storeInfo.users.length} collectors </p>
            </div>
        )
    } else {
        return "loading"
    }
}
