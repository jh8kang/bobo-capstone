import React, {useState, useEffect} from 'react';
import profileImage from '../../assets/icons/profile.svg';
import {db} from '../../firebase';
import './PointAdderModal.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white.svg';
import {v4 as uuid} from 'uuid';

// starCounter takes in a num and creates an array of that length
function starCounter(points) {
    let array = [];
    for (let i = 0; i < points; i++) {
        array.push(i)
    }
    return array;
}

export default function EditModal({show, userInfo, storeId, hideUserProfile, pageLoadHandler}) {
    let [currentPoints, setCurrentPoints] = useState(0);
    let [maxPoints, setMaxPoints] = useState(0);
    let [pointsLeft, setPointsLeft] = useState(0);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

// variables
    let pointsLeftArray = starCounter(pointsLeft);
    let currentPointsArray = starCounter(currentPoints);
 
    useEffect(()=> {
// sets variables accordingly 
        if (userInfo.stores) {
            userInfo.stores.map(store=> {
                if (store.id === storeId) {
                    setCurrentPoints(store.points)
                    setMaxPoints(store.pointmax)
                    let restOfPoints = store.pointmax - store.points;
                    console.log(restOfPoints)
                    setPointsLeft(restOfPoints)
                }
            })
        }
    }, [currentPoints])

// pointHandler adds a point to current point amount
    let pointHandler = () => {
        setCurrentPoints(currentPoints + 1);
        setPointsLeft(pointsLeft - 1);
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
        pageLoadHandler();
    }

// prompts when user searched doesn't exist
    if (userInfo.name == undefined && show ===true) {
        return <p>loading...</p>
    } 

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img className="modal-main__profile" src={profileImage} alt="user profile"/>
                </div>
                <div>
                    <p>{userInfo.name}</p>
                </div>
                <div>
                    <p>{userInfo.username}</p>
                </div>
                <div className="modal-main__points">
                    {currentPointsArray.map(point=> {
                        return <img className="modal-main__yellow-star" src={`${yellowStar}`} key={uuid()}/>
                    })}
                    {pointsLeftArray.map(point=> {
                        return <img className="modal-main__yellow-star" src={`${whiteStar}`} key={uuid()}/>
                    })}
                    
                    <button className="modal-main__buttons__btn" onClick={pointHandler}>Add point</button>
                    
                </div>
                        <button className="modal-main__buttons__btn" onClick={hideUserProfile}>Ok</button>
            </section>
        </div>
    )

    
    

}



