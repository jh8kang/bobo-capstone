import React from 'react';
import './StoreList.scss';
import store1 from '../../assets/images/store1.jpg'

export default function StoreList() {
    return (
        <div className="storeList">
            <div className="item">
                <div className="item__imgBox">
                    <img className="item__img"src={`${store1}`}/>
                </div>
                <div className="item__info">
                    <p className="item__info__storename">Store Name</p>
                    <p className="item__info__des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi numquam ab delectus minima ad, neque commodi animi quos</p>
                <button className="item__info__btn">Start Collecting</button>
                </div>
            </div>
            <div className="item">
                <div className="item__imgBox">
                    <img className="item__img"src={`${store1}`}/>
                </div>
                <div className="item__info">
                    <p className="item__info__storename">Store Name</p>
                    <p className="item__info__des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi numquam ab delectus minima ad, neque commodi animi quos</p>
                <button className="item__info__btn">Start Collecting</button>
                </div>
            </div>
            <div className="item">
                <div className="item__imgBox">
                    <img className="item__img"src={`${store1}`}/>
                </div>
                <div className="item__info">
                    <p className="item__info__storename">Store Name</p>
                    <p className="item__info__des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi numquam ab delectus minima ad, neque commodi animi quos</p>
                <button className="item__info__btn">Start Collecting</button>
                </div>
            </div>
            
        </div>
    )
}
