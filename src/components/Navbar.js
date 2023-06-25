import React from 'react';
import {FaSistrix,FaTelegramPlane,FaRegCompass,FaRegHeart} from 'react-icons/fa';
import {MdHome} from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {ContextProvider} from '../Global/Context';

const Navbar = () => {
    const {model,user,loader,logout} = React.useContext(ContextProvider);
    const navigate = useNavigate(); // Initialize useHistory hook
    console.log("my model : ",model);
    
    // const openForms = () =>{
    //     openModel();
    // }

    const userLogout = () =>{
        logout();
        navigate('/login'); // Redirect to the login page after logout
    }

    const checkUser = () =>{
        return !loader ? !loader && user ? (
            <li>{user.displayName}/ <span onClick={userLogout}>Logout</span></li>
        ):(
            <li >Register/Login</li>
        ) : (
            "..."
        );
    };

    return (
        <div className="navbar">
            <div className="navbar__first">
                <div className="navbar__first-logo">        
                    <h3 className="socialshots-logo">socialshots</h3>
                </div>
            </div>
            <div className="navbar__middle">
                <div className="navbar__middle-search">
                    <input type="text" className="navbar__search" placeholder="Search"/>
                    <FaSistrix className="searchIcon"/>
                </div>
            </div>
            
            <div className="navbar__last">
                <li>
                    <MdHome className="navbar__icons" />
                </li>
                <li>
                    <FaTelegramPlane className="navbar__icons" />
                </li>
                <li>
                    <FaRegCompass className="navbar__icons" />
                </li>
                <li>
                    <FaRegHeart className="navbar__icons" />
                </li>
                {checkUser()}
            </div>
        </div>
    )
}

export default Navbar
