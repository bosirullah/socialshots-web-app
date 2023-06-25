import React, { useContext } from 'react';
import { ContextProvider } from '../Global/Context';
import Comment from './Comments';
import { ref, remove, onValue } from "firebase/database";
import Hamburger from 'hamburger-react';
import {db,auth,storage} from "../config";
import {setPersistence, browserSessionPersistence } from 'firebase/auth';


const Posts = () => {
    // We can access the post value using the ContextProvider
    const {user, posts, followedUsersPosts,setPosts, loggedInUserId } = useContext(ContextProvider);
    const [isOpen, setOpen] = React.useState(false);
    
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);
    
    const allPosts = [...posts, ...followedUsersPosts];

    const handleDelete = async (postId) => {
        console.log("postid = ",postId)
        try {
            // Delete post from the database
            const postRef = ref(db, `users/${user.uid}/posts/${postId}`);

            remove(postRef).then(()=>{
                console.log("post removed");
            })

        } catch (error) {
            console.log('Error deleting post:', error);
        }
    };

    if (!user) {
        // User data is not yet available, show a loading indicator or return null
        return <div></div>;
    }



    return (
        <>
            {allPosts.map((post) => (
                <div className="posts" key={post.id}>
                {/* {console.log("postId = ",post.id)} */}
                    <div className="posts__header">
                        <div className="posts__header-left">
                            <div className="posts__header-avatar">{post.username[0]}</div>
                            <div className="posts__header-name">{post.username}</div>
                        </div>
                        {/* {loggedInUserId === user.uid && ( */}
                        <div className={`menu-icon ${isDropdownVisible ? 'active' : ''}`} onClick={() => setDropdownVisible(!isDropdownVisible)}>
                            <div className="hamburger-react" role="button">
                                <div className="line-1"></div>
                                <div className="line-2"></div>
                                <div className="line-3"></div>
                            </div>
                        </div>
                        {/* )} */}
                            {isDropdownVisible && (
                                <div className="delete-dropdown">
                                    <div className="delete-option" onClick={() => handleDelete(post.id)}>Delete</div>
                                </div>
                            )}
                    </div>
                    <div className="posts__img">
                        <img src={post.image} alt={post.image} />
                    </div>
                    <Comment id={post.id} />
                </div>
            ))}
        </>
    );
}

export default Posts;
