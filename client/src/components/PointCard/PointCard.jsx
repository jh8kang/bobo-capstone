import React from 'react';
import './PointCard.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white.svg';
import deleteBtn from '../../assets/icons/delete.svg';
import {v4 as uuid} from 'uuid';

// starCounter takes in a num and creates an array of that length
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
    let restOfPoints = starCounter(maxPoints - store.points);

    return (
        <div className="pointcard">
            <div>
                <h1 className="pointcard__name">{store.name}</h1>
                <div>
                    {userPoints.map(point=> <img className="pointcard__star" src={yellowStar} key={uuid()} alt="yellow star"/>)}
                    {restOfPoints.map(point=> <img className="pointcard__star" src={whiteStar} key={uuid()} alt="white star"/>)}
                </div>
            </div>
            <img src={deleteBtn} id={store.id}className="pointcard__delete" onClick={deleteStore} alt="delete"/>
        </div>
    )
}
