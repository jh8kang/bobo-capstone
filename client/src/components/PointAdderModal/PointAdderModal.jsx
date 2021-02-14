import React, {useEffect, useState} from 'react';
import profileImage from '../../assets/icons/profile.svg';
import './PointAdderModal.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white2.svg';
import {v4 as uuid} from 'uuid';
import {db, auth} from '../../firebase';

// starCounter takes in a num and creates an array of that length
function starCounter(points) {
    let array = [];
    for (let i = 0; i < points; i++) {
        array.push(i)
    }
    return array;
}

export default function PointAdderModal({show, userInfo, hideUserProfile, currentPointsHandler, currentPoints, restOfPoints}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    let [validUser, setValidUser] = useState(null);

// variables
    let userPointsArray = starCounter(currentPoints);
    let restOfPointsArray = starCounter(restOfPoints);
    let userImage;

// prompts when user searched doesn't exist
    if (userInfo.name === undefined && show === true) {
        return <p>loading...</p>
    } 

// sets user profile image
    if (userInfo.image) {
        userImage = userInfo.image;
    } else {
        userImage = profileImage;
    }

// checks if user is collecting from store
    db.collection('stores') 
    .get()
    .then(snapshot=> {
        snapshot.forEach(doc=> {
            if (doc.data().uid === auth.currentUser.uid) {
                let users = doc.data().users;
                setValidUser(users.find(user=> user === userInfo.uid));
            }
        })
    })
    .catch(err=> console.log(err))

// checks if client is registerd to store
    if (validUser == undefined) {
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <div>
                        <img className="modal-main__profile" src={userImage} alt="user profile"/>
                    </div>
                    <div>
                        <p>{userInfo.name}</p>
                    </div>
                    <div className="modal-main__points">     
                        <p>User is not in your system</p>
                    </div>
                    <button className="modal-main__buttons__btn" onClick={hideUserProfile}>Ok</button>
                </section>
            </div>
        )
    } else if (userInfo == {}) {
        console.log("hi")

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
                <div className="modal-main__points">     
                    {userPointsArray.map(point=> {return <img className="modal-main__yellow-star" src={`${yellowStar}`} alt="yellow star" key={uuid()}/>})}  
                    {restOfPointsArray.map(point=> {return <img className="modal-main__yellow-star" src={`${whiteStar}`} alt="white star" key={uuid()}/>})}  
                    <button className="modal-main__buttons__btn" onClick={currentPointsHandler}>Add point</button>
                </div>
                <button className="modal-main__buttons__btn" onClick={hideUserProfile}>Ok</button>
            </section>
        </div>
    )

    
    

}



