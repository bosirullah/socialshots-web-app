import React from 'react';
import { ContextProvider } from '../Global/Context';
import { ref as rtdbRef,onValue,set,get } from "firebase/database";
import { db, auth} from '../config';


const Sidebar = () => {
    const {loader, user} = React.useContext(ContextProvider);
    const [usernames, setUsernames] = React.useState([]);
    // const username = !loader && user && user.displayName ? user.displayName : '';
    // const [state] = React.useState([
    //     {id:1,image: '/images/1.avif', name: "Yuji Itadori"},
    //     {id:2,image: '/images/2.avif', name: "Light Yagami"},
    //     {id:3,image: '/images/3.png', name: "kawai on'nanako"},
    //     {id:4,image: '/images/4.jpg', name: "lone wolf"},
    //     {id:5,image: '/images/5.jpg', name: "gojo sataraou"},
    //     {id:6,image: '/images/6.jpg', name: "lonely girl"},
    //     {id:7,image: '/images/7.webp', name: "nezuko chaaan"},
    //     {id:8,image: '/images/8.jpg', name: "monkey D luffy"},
    //     {id:9,image: '/images/9.jpeg', name: "criminal guy"},
    //     {id:10,image: '/images/10.webp', name: "sung jin woo"},
    // ])

    const handleFollow = (followedUserId) => {
        const currentUserUid = user.uid;
    
        const followedUserRef = rtdbRef(db, `users/${followedUserId}/followers/${currentUserUid}`);
        set(followedUserRef, true)
            .then(() => {
                console.log('Followed user successfully');
            })
            .catch((error) => {
                console.log('Error following user:', error);
            });
    };

    const fetchUsers = async () => {
        try {
            const usersRef = rtdbRef(db, 'users');
            const snapshot = await get(usersRef);
        
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const users = Object.keys(usersData).map((key) => {
                    const userData = {
                        uid: key,
                        username: usersData[key].username,
                        image: usersData[key].image,
                    };
                    return userData;
                });
                setUsernames(users);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosts = () => {
        if (user && user.uid) {
            const currentUserUid = user.uid;
            const followingRef = rtdbRef(db, `users/${currentUserUid}/following`);

            onValue(followingRef, (snapshot) => {
                const followingData = snapshot.val();

                if (followingData) {
                    const followingUsers = Object.keys(followingData);

                    followingUsers.forEach((followingUserId) => {
                        const postsRef = rtdbRef(db, `users/${user.uid}/posts/${followingUserId}`);
                        onValue(postsRef, (postsSnapshot) => {
                            const postsData = postsSnapshot.val();

                            if (postsData) {
                                const posts = Object.keys(postsData).map((postId) => ({
                                    id: postId,
                                    userId: followingUserId,
                                    content: postsData[postId].content,
                                }));
                                console.log('Posts:', posts);
                                // Do something with the fetched posts
                            }
                        });

                        const commentsRef = rtdbRef(db, `posts/${user.uid}/comments/${followingUserId}`);
                        onValue(commentsRef, (commentsSnapshot) => {
                            const commentsData = commentsSnapshot.val();

                            if (commentsData) {
                                const comments = Object.keys(commentsData).map((commentId) => ({
                                    id: commentId,
                                    userId: followingUserId,
                                    content: commentsData[commentId].content,
                                }));
                                console.log('Comments:', comments);
                                // Do something with the fetched comments
                            }
                        });
                    });
                }
            });
        }
    };

    React.useEffect(() => {
        if (!loader && user) {
            if (user.displayName) {
                // If displayName is already available, fetch the users
                fetchUsers();
                fetchPosts();
            }
        }
    }, [loader, user]);

    

    const username = !loader && user && user.displayName ? user.displayName : '';
    
    
    
    
    
    
    

    return (
        <div className="sidebar">
            {
                !loader && user ? (
                    <div className="sidebar__user">
                        <div className="sidebar__user-avatar">{username[0]}</div>
                        <div className="sidebar__user-name">{username}</div>
                    </div>
                ): (
                ''
                )
            }

            <div className="sidebar__list">
                <h3>Suggestion for you</h3>
                {usernames.map((user, index) =>(
                    <div className="sidebar__list-user" key={user.id}>
                        <div className="sidebar__list-a">
                            <div className="sidebar__list-a-img">
                                <img src={user.image} alt={user.image} />
                            </div>
                            <div className="sidebar__list-a-name">{user.username}</div>
                        </div>
                        <div className="sidebar__list-b">
                        <button onClick={() => handleFollow(user.uid)}>Follow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
