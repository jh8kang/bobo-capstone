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
                <form className="signupForm" onSubmit={updateUserInfo}>
                    <div>
                        <label htmlFor="name" >name</label>
                        <input className="modal-main__input" type="text" id="name" name="name" placeholder={userInfo.name}/>
                    </div>
                    <div>
                        <label htmlFor="location">location</label>
                        <select id="location" name="location">
                            <option value="vancouver">Vancouver</option>
                            <option value="toronto">Toronto</option>
                            <option value="toronto">Calgary</option>
                        </select>
                    </div>
                    <button>Save</button>
                </form>
                <button onClick={hideEdit}>Cancel</button>
            </section>
        </div>
    )
}
