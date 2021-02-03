import React from 'react';
import './StoreEditModal.scss';
import upArrow from '../../assets/icons/uparrow.svg';
import defaultImage from '../../assets/images/default.jpg';

export default function EditModal({show, storeInfo, updateStoreInfo, hideEdit, onPhotoChange}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

// sets default image
    let storeImage;
    if (storeInfo.image) {
        storeImage = storeInfo.image
    } else {
        storeImage = defaultImage
    }

    return (
        <div className={showHideClassName}>
            <section className="store-edit">
                <h1 className="store-edit__title">EDIT</h1>
                <img className="store-edit__image" src={storeImage} alt="store"/>
                <form id="edit-form" className="edit-form" onSubmit={updateStoreInfo}>
                    <label className="edit-form__file-label" htmlFor="file">
                        <img className="edit-form__icon__arrow" src={upArrow} alt="up arrow"/>
                        Choose File for Image 
                    </label>
                    <input className="edit-form__file" id="file" name="file" type="file" onChange={onPhotoChange}/>
                    <div className="edit-form__item">
                        <label className="store-edit__label" htmlFor="name">Name</label>
                        <input className="store-edit__input" type="text" id="name" name="name" placeholder={storeInfo.name}/>
                    </div>
                    <div className="edit-form__item">
                        <label className="store-edit__label" htmlFor="description" >Description</label>
                        <textarea className="store-edit__input" type="text" id="description" name="description" placeholder={storeInfo.description}/>
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <select id="location" name="location">
                            <option value="vancouver">Vancouver</option>
                            <option value="toronto">Toronto</option>
                            <option value="toronto">Calgary</option>
                        </select>
                    </div>
                    <div className="edit-form__buttons">
                        <button className="edit-form__buttons__btn">Save</button>
                        <button className="edit-form__buttons__btn"onClick={hideEdit}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

