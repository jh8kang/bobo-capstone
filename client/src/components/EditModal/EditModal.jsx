import React from 'react';
import './EditModal.scss';
import profile from '../../assets/icons/profile.svg';
import upArrow from '../../assets/icons/uparrow.svg';

export default function EditModal({show, userInfo, updateUserInfo, hideEdit, onPhotoChange, fileUrl}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    let userImage;
    if (fileUrl) {
        userImage = fileUrl;
    } else if (userInfo.image == null) {
        userImage = profile;
    } else {
        userImage = userInfo.image;
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img className="modal-main__profile" src={userImage} alt="user profile"/>
                </div>
                <form className="signup-form" id="signup-form" onSubmit={updateUserInfo}>
                    <label className="edit-form__file-label" htmlFor="file">
                        <img className="edit-form__icon__arrow" src={upArrow} alt="up arrow"/>
                        Choose File for Image 
                    </label>
                    <input className="edit-form__file" id="file" name="file" type="file" onChange={onPhotoChange}/>
                    <input className="modal-main__input" placeholder={`${userInfo.name}`} type="text" id="name" name="name"/>
                    <div className="modal-main__location">
                        <label htmlFor="location" className="modal-main__label">LOCATION</label>
                        <select id="location" name="location">
                            <option value="vancouver">Vancouver</option>
                            <option value="toronto">Toronto</option>
                            <option value="calgary">Calgary</option>
                        </select>
                    </div>
                    <div className="modal-main__buttons">
                        <button className="modal-main__buttons__btn">Save</button>
                    </div>
                </form>
                        <button className="modal-main__buttons__btn" onClick={hideEdit}>Cancel</button>
            </section>
        </div>
    )
}
