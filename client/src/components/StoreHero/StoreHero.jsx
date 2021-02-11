import React, {useState, useEffect} from 'react';
import './StoreHero.scss';
import {db, auth} from '../../firebase';
import Header from '../Header/Header';

export default function StoreHero(props) {
    let [storeInfo, setStoreInfo] = useState({});

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStoreInfo(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))
    }, [])

    if (storeInfo.users) {
        let usersCount = storeInfo.users.length;
        let collectors="collectors";

        if(usersCount === 1) {
            collectors = "collector"
        }

        return (
            <div>
                <Header userInfo={storeInfo}/>
                <div className="store-hero">
                    <p className="store-hero__name">{storeInfo.name}</p>
                    <p className="store-hero__collector-count">{usersCount} {collectors} </p>
                </div>

            </div>
        )
    } else {
        return "loading"
    }
}
