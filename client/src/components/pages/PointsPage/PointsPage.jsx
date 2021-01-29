import React, {useState, useEffect} from 'react';
import './PointsPage.scss';
import Footer from '../../Footer/Footer';
import PointCard from '../../PointCard/PointCard';
import {auth, db} from '../../../firebase';
import {v4 as uuid} from 'uuid';

export default function PointsPage() {
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [userPoints, setUserPoints] = useState(null);
    const [maxPoints, setMaxPoints] = useState(null);

    useEffect(() => {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setStores(doc.data().stores)
                }
            })
        })
        .catch(err=> console.log(err))
    }, [store])



    console.log(stores)

    return (
        <div>
            <div className="pointsPage">
                <h1>Your Points</h1>
                {stores.map(store=> <PointCard store={store} key={uuid()}/>)}
            </div>
            <Footer/>
        </div>
    )
}
