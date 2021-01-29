import React from 'react';
import './PointCard.scss';
import yellowStar from '../../assets/icons/point-yellow.svg';
import whiteStar from '../../assets/icons/point-white.svg';

function starCounter(points) {
    let array = [];
    for (let i = 0; i < points; i++) {
        array.push(i)
    }
    return array;
}


export default function PointCard(props) {
    let {store} = props
    let maxPoints = store.pointmax;
    let userPoints = starCounter(store.points);
    let restOfPoints = starCounter(maxPoints - userPoints);
    console.log(userPoints)
    console.log(restOfPoints)

    return (
        <div className="pointcard">
            <h1>{store.name}</h1>
            {/* <p>{store.points}</p>
            <p>{store.pointmax}</p> */}
            <div>
                {userPoints.map(point=> <img className="pointcard__star" src={yellowStar}/>)}
                {restOfPoints.map(point=> <img className="pointcard__star" src={whiteStar}/>)}
            </div>
        </div>
    )
}
