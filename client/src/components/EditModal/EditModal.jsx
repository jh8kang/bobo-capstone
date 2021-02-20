import React, {useState, useEffect} from 'react';
import './EditModal.scss';
import profile from '../../assets/icons/profile.svg';
import upArrow from '../../assets/icons/uparrow.svg';
import ImageSearch from '../ImageSearch/ImageSearch';

export default function EditModal({show, userInfo, updateUserInfo, hideEdit, onPhotoChange, fileUrl, reloadPage, onPhotoChangeSearch}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    let [showImageSearch, setShowImageSearch] = useState(false);
    
    let userImage;
    if (fileUrl) {
        userImage = fileUrl;
    } else if (userInfo.image == null) {
        userImage = profile;
    } else {
        userImage = userInfo.image;
    }

    useEffect(()=> {
    }, [showImageSearch])

    let showSearch = () => {
        setShowImageSearch(true);
    }

    let closeSearch = () => {
        setShowImageSearch(false);
        let form = document.getElementById('imageSearch')
        form.reset();
    }

    let closeModal = () => {
        setShowImageSearch(false);
        hideEdit();
    }

    let saveModal = (e) => {
        setShowImageSearch(false);
        updateUserInfo(e);
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-main__top">
                    <img className="modal-main__profile" src={userImage} alt="user profile"/>
                </div>
                <form className="signup-form" id="signup-form" onSubmit={saveModal}>
                    <div className="modal-main__image-choice">
                        <label className="modal-main__top__btn" htmlFor="file">
                                {/* <img className="edit-form__icon__arrow" src={upArrow} alt="up arrow"/> */}
                                Choose File for Image 
                        </label>
                        <p onClick={showSearch} className="modal-main__top__btn">Choose from Unsplash</p>
                    </div>
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
                        <label htmlFor="cancelEdit" className="modal-main__buttons__btn">Cancel</label>
                    </div>
                </form>
                        <button className="modal-main__buttons__btn--hide" name="cancelEdit" id="cancelEdit" onClick={closeModal}>Cancel</button>
            </section>
            <ImageSearch showImageSearch={showImageSearch} closeSearch={closeSearch} reloadPage={reloadPage} onPhotoChangeSearch={onPhotoChangeSearch}/>
        </div>
    )
}
