import React from 'react';
import { ContextProvider } from '../Global/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { storage } from '../config';
import {ref,uploadBytes,getDownloadURL  } from 'firebase/storage';


const ProfilePicChanger = () =>{
    const {loader,user,showPopup,setShowPopup, uploadProfilePic, photoURL,setPhotoURL} = React.useContext(ContextProvider);
    const fileInputRef = React.useRef(null);
    const [photo, setPhoto] = React.useState(null);
    

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleChange = (e) =>{
        const image = e.target.files[0];
        if (image) {
            setPhoto(image);
        }
    }

    const handleClick = () =>{
        uploadProfilePic(photo);
    }

    React.useEffect(() =>{
        console.log("ue = ",user);
        if(user?.photoURL){
            setPhotoURL(user.photoURL);
        }
    },[user])

    
    return (
        <div className="picContainer">
            {
                showPopup ? (
                    
                    <div className="pop__up">
                        <button onClick={handleClosePopup}><FontAwesomeIcon icon={faXmark} size="xl" className="crossSymbol"/></button>
                        <div className="profile__pic">
                            <img src={photoURL} className="avatar_pic" alt = {user.displayName[0]} />
                            <input ref={fileInputRef} type="file" onChange={handleChange}/>                
                            <button className="upload__btn" onClick={handleClick}>Upload</button>
                        </div>
                    </div>
                    
                ):(
                    ''
                )
            }
        </div>
        
    )
}

export default ProfilePicChanger;