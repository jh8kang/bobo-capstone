import React, {useState, useEffect} from 'react';
import './PointManagePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import PointAdderModal from '../../PointAdderModal/PointAdderModal';
import {db, auth} from '../../../firebase';
import QrReader from 'react-qr-scanner';
import Header from '../../Header/Header';



export default function PointManagePage() {
    let [show, setShow] = useState(false);
    let [userInfo, setUserInfo] = useState({});
    let [storeId, setStoreId] = useState({});
    let [storeInfo, setStoreInfo] = useState({});
    let [pageLoader, setPageLoader] = useState(false);
    let [currentPoints, setCurrentPoints] = useState(0);
    let [restOfPoints, setRestOfPoints] = useState(0);
    let [delay] = useState(100);
    let [result, setResult] = useState("no result"); 
    let [date, setDate] = useState(new Date());
    let [error, setError] = useState("");

    const previewStyle = {
        height: 240,
        width: 320
    }

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStoreId(doc.id)
                    setStoreInfo(doc.data());
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader])


// closes the usermodal
    let hideUserProfile = () => {
        setShow(false);
        setUserInfo({})
        document.getElementById("userSearchBar").reset();
    }

// opens up the user modal
    let showUserProfile = (e) => {
        e.preventDefault();
        setShow(true)
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().username === e.target.searchUser.value) {
                    setUserInfo(doc.data())
                    doc.data().stores.map(store=> {
                        if (store.id === storeId) {
                            setCurrentPoints(store.points)
                            let restPoints = store.pointmax - store.points;
                            setRestOfPoints(restPoints)
                        }
                    })
                } else {
                    setError("user doesn't exist");
                }
            })
        })
        .catch(err=> console.log(err))
    }

    let pageLoadHandler = () => {
        setPageLoader(!pageLoader)
    }

// Adds a point to the client and updates line graph
    let currentPointsHandler = ()=> {
        setCurrentPoints(currentPoints + 1);
        setRestOfPoints(restOfPoints - 1);
        db.collection("usertype")
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc => {
                if (doc.data().uid === userInfo.uid) {
                    let data = doc.data().stores
                    let store = data.find(store=> store.id === storeId)
                    store.points +=1
                    db.collection("usertype").doc(`${doc.id}`).update({
                        stores: data
                    })
                }
            })
        })

        db.collection("stores")
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    if ((doc.data().timetracker[3] !== 1) && (date.getDay() == 1)) {
                        let tracker = [0,0,0,0,0,0,0]
                        let date = new Date();
                        let dayOfWeek = date.getDay();
                        tracker[dayOfWeek - 1] +=1;
                        db.collection('stores').doc(`${doc.id}`).update({
                            tracker: tracker,
                        })
                    } else {
                        let tracker = doc.data().tracker
                        let date = new Date();
                        let dayOfWeek = date.getDay();

                        if (dayOfWeek == 0) {
                            tracker[6] +=1;

                        } else {
                            tracker[dayOfWeek - 1] +=1;
                        }
                        
                        db.collection('stores').doc(`${doc.id}`).update({
                            tracker: tracker,
                            timetracker: [date.getFullYear(), date.getMonth(), date.getDate(), date.getDay()]
                        })
                    }
                }
            })
        })
        pageLoadHandler();
    }

// opens up user modal through QRcode
    let handleScan = (data)=> {
        // setResult(data)
        setShow(true)
        if (data !== null) {
            console.log(data.text)
            setResult(data.text)
            db.collection("usertype")
            .get()
            .then(snapshot=> {
                snapshot.forEach(doc=> {
                    if (doc.data().uid === data.text) {
                        setUserInfo(doc.data())
                        doc.data().stores.map(store=> {
                            if (store.id === storeId) {
                                setCurrentPoints(store.points)
                                let restPoints = store.pointmax - store.points;
                                setRestOfPoints(restPoints)
                            }
                        })
                    }
                })
            })
        }
    }

    let handleError = (err) => {
        console.log(err)
    }

    return (
        <div className="point-manager">
            <Header userInfo={storeInfo}/>
            <div className="point-manager__content">
                <h1 className="point-manager__title">Point Manager</h1>
                <form onSubmit={showUserProfile} id="userSearchBar" className="point-form">
                    <input className="point-form__search-bar" type="text" placeholder="Search user by username" id="searchUser" name="searchUser"/>
                </form>
                <p>{error}</p>
                <div className="point-manager__scanner">
                    <QrReader
                        delay={delay}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                </div>
                    <p>{result}</p>
            </div>
            <PointAdderModal show={show} restOfPoints={restOfPoints} currentPoints={currentPoints} currentPointsHandler={currentPointsHandler}hideUserProfile={hideUserProfile} userInfo={userInfo} storeId={storeId} pageLoadHandler={pageLoadHandler}/>
            <FooterStore/>
        </div>
    )
}
