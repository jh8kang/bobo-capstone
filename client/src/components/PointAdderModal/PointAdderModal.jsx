import React from 'react';
import profileImage from '../../assets/icons/profile.svg';
import './PointAdderModal.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white2.svg';
import {v4 as uuid} from 'uuid';

// starCounter takes in a num and creates an array of that length
function starCounter(points) {
    let array = [];
    for (let i = 0; i < points; i++) {
        array.push(i)
    }
    return array;
}

export default function EditModal({show, userInfo, hideUserProfile, currentPointsHandler, currentPoints, restOfPoints}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

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



