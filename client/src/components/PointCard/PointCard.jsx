import React from 'react';
import './PointCard.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white.svg';
import deleteBtn from '../../assets/icons/delete.svg';
import {v4 as uuid} from 'uuid';


function starCounter(points) {
    let array = [];
    for (let i = 0; i < points; i++) {
        array.push(i)
    }
    return array;
}


export default function PointCard(props) {
    let {store, deleteStore} = props
    let maxPoints = store.pointmax;
    let userPoints = starCounter(store.points);
    let restOfPoints = starCounter(maxPoints - userPoints);

    // console.log(store)
    return (
        <div className="pointcard">
            <div>
                <h1>{store.name}</h1>
                <div>
                    {userPoints.map(point=> <img className="pointcard__star" src={yellowStar} key={uuid()}/>)}
                    {restOfPoints.map(point=> <img className="pointcard__star" src={whiteStar} key={uuid()}/>)}
                </div>
            </div>
            <img src={deleteBtn} id={store.id}className="pointcard__delete" onClick={deleteStore}/>
        </div>
    )
}
