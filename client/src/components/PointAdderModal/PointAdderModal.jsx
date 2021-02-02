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

export default function EditModal({show, userInfo, hideUserProfile, currentPointsHandler, currentPoints, restOfPoints}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

// variables
    let userPointsArray = starCounter(currentPoints)
    let restOfPointsArray = starCounter(restOfPoints)

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
                    {userPointsArray.map(point=> {return <img className="modal-main__yellow-star" src={`${yellowStar}`}/>})}  
                    {restOfPointsArray.map(point=> {return <img className="modal-main__yellow-star" src={`${whiteStar}`}/>})}  
                    <button className="modal-main__buttons__btn" onClick={currentPointsHandler}>Add point</button>
                </div>
                        <button className="modal-main__buttons__btn" onClick={hideUserProfile}>Ok</button>
            </section>
        </div>
    )

    
    

}



