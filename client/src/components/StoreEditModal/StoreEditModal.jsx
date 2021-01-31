import React from 'react';
import './StoreEditModal.scss';


export default function EditModal({show, storeInfo, updateStoreInfo, hideEdit}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="store-edit">
                <h1>Edit Page</h1>
                <form id="editForm" onSubmit={updateStoreInfo}>
                    <div>
                        <label htmlFor="name" >name</label>
                        <input className="store-edit__input" type="text" id="name" name="name" placeholder={storeInfo.name}/>
                    </div>
                    <div>
                        <label htmlFor="description" >name</label>
                        <textarea className="store-edit__input" type="text" id="description" name="description" placeholder={storeInfo.description}/>
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

