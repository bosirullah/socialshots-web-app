import React,{createContext} from 'react';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { db,auth,storage } from '../config';
import {ref,uploadBytes,getDownloadURL  } from 'firebase/storage';
import { ref as rtdbRef,set,push,serverTimestamp,onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';


export const ContextProvider = createContext();

const Context = (props) => {
    const [user, setUser] = React.useState(null); 
    const [loader,setLoader] = React.useState(true);
    const [posts,setPosts] = React.useState([]);

    const [error,setError] = React.useState('');
    const [timer,setTimer] = React.useState(null);
    const [visible, setVisible] = React.useState(true);
    const navigate = useNavigate(); // Hook for navigation

    const [isRegistered,setIsRegistered] = React.useState(null);
    // const [registrationStatus, setRegistrationStatus] = React.useState(null);

    const { onLoginFailure,onLoginSuccess, onLogout } = props;

    const register = async (user) =>{
        const {username, email, password} = user;
        try{
            createUserWithEmailAndPassword(auth,email,password)
                .then(async (userCredential)=>{

                    setIsRegistered(true);
                    user = auth.currentUser;
                    await updateProfile(user,{displayName:username});



                    console.log("successfully registerd = ", isRegistered)
                })
                .catch((error) => {
                    setIsRegistered(false);
                    
                    setError(error.message);
                    console.log("register error");
                    console.log(error);
                    setVisible(true); // Show the error message
            
                    // Clear the previous timeout and set a new one
                    clearTimeout(timer);
                    setTimer(
                    setTimeout(() => {
                        setVisible(false);
                    }, 3000)
                    );
                });

                const userRef = rtdbRef(db,`users`);
                const newUserRef = push(userRef);
                set(newUserRef,{username});



            // Create a user-specific node in the database
            // const userRef = rtdbRef(db, `users/${user.uid}`);
            // set(userRef, { username });
            
            // navigate('/login');
            
        } catch(err){
            console.log("2nd catch err");
        } 
    }

    const login = async (user) => {
        const { email, password } = user;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(userCredential);
            onLoginSuccess();
        } catch (error) {
            onLoginFailure();
            console.log("bigggg errorr");
            console.log(error);
            setError(error.message);

            setVisible(true); // Show the error message

            // Clear the previous timeout and set a new one
            clearTimeout(timer);
            setTimer(setTimeout(() => {
                setVisible(false);
            }, 3000));
        }
    };

    const logout = () =>{
        auth.signOut().then(function(){
            setUser(null);
            setPosts([]); //Resets the post state to an empty array
            onLogout();
            setError('');
        }).catch(err =>{
            console.log(err);
        })
    }

    /*
        to access and modify data we have to setup the necessary read and write
        rules in the firebase website.
    */

    const create = (data) => {
        const { title, image } = data;
        // Create a reference to the user-specific folder in Firebase Storage
        const userStorageRef = ref(storage, `users/${user.uid}/images/${image.name}`);

        uploadBytes(userStorageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                const postsRef = rtdbRef(db, `users/${user.uid}/posts`);
                const newImageRef = push(postsRef);
                const newImageKey = newImageRef.key;
        
                const newImageData = {
                    title,
                    image: downloadURL,
                    username: user.displayName,
                    currentTime: serverTimestamp(),
                };
        
                set(newImageRef, newImageData)
                .then(() => {
                    console.log("Image uploaded successfully");
                })
                .catch((error) => {
                    console.log("Error uploading image:", error);
                });
            });
        });
    };

    //this will recieve comment data
    const publishComment = data =>{
        const {id,comment} = data;
        /*
            The commentData object is created with the comment, username (assuming it's available from the user object), 
            and currentTime using 'serveTimestamp()'.
        */
        const commentData = {
            comment,
            username: user.displayName,
            currentTime: serverTimestamp()
        }

        //A reference to the comments location for the specific post is created using ref and the appropriate path.
        const commentsRef = rtdbRef(db,`posts/${id}/comments`);
        //A new comment is pushed to the comments location using the push method to generate a unique key for the comment.
        const newCommentRef = push(commentsRef);

        //The comment data is then set at the newly generated key using the set method.
        set(newCommentRef,commentData)
        // The then and catch methods are used to handle the success and error cases respectively.
            .then(()=>{
                console.log("Comment added successfully");
            })
            .catch((err)=>{
                console.log("Error adding comment: ", err);
            });
        
    };


    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoader(false);
        });
    
        const fetchPosts = () => {
            if (user) {
                // Fetch posts from the realtime database specific to the user
                const postsRef = rtdbRef(db, `users/${user.uid}/posts`);
            
                onValue(postsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const posts = Object.keys(data).map((key) => ({
                            id: key,
                            title: data[key].title,
                            image: data[key].image,
                            username: data[key].username,
                        }));
                
                        // Reverse the array to display the posts in descending order
                        const reversePosts = posts.reverse();
                
                        // Set the user-specific posts
                        setPosts(reversePosts);
                    }
                }, (err) => {
                    console.log("Error fetching posts:", err);
                });
            }
        };

        fetchPosts();

        setIsRegistered(isRegistered);
        console.log("isRegistered =", isRegistered);
        
    }, [user, loader, isRegistered]);

    // once the component is rendered it automatically runs

    return (

        //the below tag will provide the data that will be present in this component to the child components
        // <ContextProvider.Provider value={{model,openModel,closeModel,register,login,user,loader,logout,create,posts,publishComment}}>
        <ContextProvider.Provider value={{register,login,user,loader,logout,create,posts,publishComment,error,timer,setTimer,visible,setVisible,isRegistered}}>
            {props.children}
        </ContextProvider.Provider>
    )
}


export default Context
