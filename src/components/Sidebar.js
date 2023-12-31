import React from 'react';
import { ContextProvider } from '../Global/Context';
import { ref as rtdbRef,onValue,set,get } from "firebase/database";
import { db, auth} from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const {loader, user, followUser, followedUsers, unfollowUser, loggedInUserId,showPopup,setShowPopup,photoURL} = React.useContext(ContextProvider);
    const [usernames, setUsernames] = React.useState([]);
    // const [showPopup, setShowPopup] = React.useState(false);
    
    React.useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const usersRef = rtdbRef(db, 'users');
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log("snap = ",data)
                    const usernames = [];
                    /*
                        In this code, Object.entries(userData.posts) is used to iterate over the key-value pairs in the posts object for each user.
                        Each iteration provides the postId (key) and postData (value) for each post object. You can then access the properties inside postData,
                        such as postData.username and postData.image, and add them to the usernames array along with the id.
                    */
                        
                    Object.entries(data).forEach(([uid, userData]) => {

                        // Exclude the logged-in user from the sidebar
                        if (uid !== user.uid) {                            
                            Object.entries(userData.profile).forEach(([postId, username]) => {  
                                // Add the username and image to the usernames array
                                usernames.push({
                                    id: uid,
                                    username,
                                    photoURL
                                });
                            });
                        }
                    });

                    setUsernames(usernames);
                }
            } catch (error) {
                console.log('Error fetching usernames:', error);
            }
            };
        
            if (!loader && followedUsers.length === 0) {
                fetchUsernames();
            }
        }, [loader,followedUsers, loggedInUserId]);
    
    const handleFollow = (userId) => {
        if (followedUsers.includes(userId)) {
            unfollowUser(userId);
        } else {
            followUser(userId);
        }
    };
    

    const username = !loader && user && user.displayName ? user.displayName : '';

    if(!user){
        return <div></div>;
    } 

    const handleButtonClick = () => {
        setShowPopup(true);
        console.log("popup = ")
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    

    return (
        <div className="sidebar">
            {
                !loader && user ? (
                    <div className="sidebar__user">
                        <img src={photoURL} className="sidebar__avatar_pic" alt = {user.displayName[0]} />
                        {/* <div className="sidebar__user-avatar">{photoURL}</div> */}
                        <div className="sidebar__user-name">{username}</div>
                        <div onClick={handleButtonClick} className="edit__btn">
                            <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon>
                        </div>
                    </div>
                ): (
                ''
                )
            }

            <div className="sidebar__list">
                <h3>Suggestion for you</h3>
                {usernames.map((user) => (
                    <div className="sidebar__list-user" key={user.id}>
                        {console.log("u = ",{user})}
                        <div className="sidebar__list-a">
                            <div className="sidebar__list-a-img">
                                    {console.log("photo = ",user.photoURL)}
                                {   
                                    user.photoURL? (
                                        <img src={user.photoURL} className="sidebar__avatar_pic" alt = {user.username[0]} />

                                    ):(
                                        <div className="avatar-img">{user.username[0]}</div>
                                    )
                                }
                            </div>
                            <div className="sidebar__list-a-name">{user.username}</div>
                        </div>
                        <div className="sidebar__list-b">
                            {followedUsers.includes(user.id) ? (
                                <a onClick={() => handleFollow(user.id)}>Unfollow</a>
                            ) : (
                                <a onClick={() => handleFollow(user.id)}>Follow</a>
                            )}
                        </div>
                    </div>
                ))}
            </div>


        </div>

        
    )
}

export default Sidebar;
