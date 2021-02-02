import React, {useState, useEffect} from 'react';
import defaultProfile from '../../assets/images/default.jpg';
import {db} from '../../firebase';
import firebase from 'firebase';

export default function EditModal({show, userInfo, storeId, hideUserProfile, pageLoadHandler}) {
    let [currentPoints, setCurrentPoints] = useState(0);
    let [pageLoader, setPageLoader] = useState(false);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

// variables
    let userImage;
    let maxPoints;

// sets user profile image
    if (userInfo.image === null) {
        userImage = defaultProfile
    } else {
        userImage = userInfo.image
    }

    useEffect(()=> {
// sets variables accordingly 
        if (userInfo.stores !== undefined) {
            userInfo.stores.map(store=> {
                if (store.id === storeId) {
                    console.log(store)
                    maxPoints = store.pointmax;
                    setCurrentPoints(store.points)
        
                }
            })
        }
    }, [pageLoader])

// pointHandler adds a point to current point amount
    let pointHandler = () => {
        setCurrentPoints(currentPoints + 1);
        pageLoadHandler();
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


    }

    // prompts when user searched doesn't exist
        if (userInfo.name == undefined && show ===true) {
            return <p>user doesnt exist</p>
        }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img className="modal-main__profile" src={userImage} alt="user profile"/>
                </div>
                <div>
                    <p>{userInfo.name}</p>
                </div>
                <div>
                    <p>{userInfo.username}</p>
                </div>
                <div>
                    <p>current points</p>
                    <p>{currentPoints}</p>
                    <button onClick={pointHandler}>Add point</button>
                </div>
                <div>
                    <p>max points</p>
                    <p>{maxPoints}</p>
                </div>
                <button onClick={hideUserProfile}>Ok</button>
            </section>
        </div>
    )
}
