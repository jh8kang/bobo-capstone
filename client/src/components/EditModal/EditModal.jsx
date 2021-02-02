import React from 'react';
import './EditModal.scss';
import profile from '../../assets/icons/profile.svg';

export default function EditModal({show, userInfo, updateUserInfo, hideEdit}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img className="modal-main__profile" src={profile} alt="user profile"/>
                </div>
                <form className="signup-form" onSubmit={updateUserInfo}>
                        <input className="modal-main__input" placeholder={`${userInfo.name}`} type="text" id="name" name="name"/>
                    <div>
                        <label htmlFor="location" className="modal-main__label">LOCATION</label>
                        <select id="location" name="location">
                            <option value="vancouver">Vancouver</option>
                            <option value="toronto">Toronto</option>
                            <option value="toronto">Calgary</option>
                        </select>
                    </div>
                    <div className="modal-main__buttons">
                        <button className="modal-main__buttons__btn">Save</button>
                        <button className="modal-main__buttons__btn"onClick={hideEdit}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
