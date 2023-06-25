import React from 'react';
import { ContextProvider } from '../Global/Context';
import { db } from '../config';
import { ref as rtdbRef,onValue } from "firebase/database";


const Comments = (props) => {
    const { loader, user, publishComment } = React.useContext(ContextProvider);
    const [state, setState] = React.useState('');
    const [comments, setComments] = React.useState([]);

    const postComment = e => {
        e.preventDefault();
        publishComment({ id: props.id, comment: state })
        setState('');
    }

    React.useEffect(() =>{
        const fetchComments = () => {
            if (user) {
              // Fetch comments from the realtime database specific to the user
                const commentsRef = rtdbRef(db, `posts/${props.id}/comments`);
            
                onValue(commentsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                    const comments = Object.keys(data).map((key) => ({
                        id: key,
                        comment: data[key].comment,
                        username: data[key].username,
                        currentTime: data[key].currentTime,
                    }));
            
                    // Set the user-specific comments
                    setComments(comments);
                    }
                }, (err) => {
                    console.log("Error fetching comments:", err);
                });
                }
            };

            fetchComments();
    })

    return (
        <div className="comments" >
            {comments.map(comment => (
                <div className="comments__container" key={comment.id} >
                    <div className="comments__container-name">{comment.username}</div>
                    <div className="comments__container-msg">{comment.comment}</div>
                </div>

            ))}

            <div className="comments__section">
                {
                    !loader && user ?
                    <form onSubmit={postComment}>
                        <input type="text" className="comment__input" placeholder="Add a comment..." onChange={(e) => setState(e.target.value)} value={state} required />
                    </form>
                    : ''
                }
            </div>
        </div>
    )
}

export default Comments;
