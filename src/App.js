import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Stories from './components/Stories';
import Create from './components/Create';
import Posts from './components/Posts';
import Sidebar from './components/Sidebar';
import Context from "./Global/Context";
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    // Check if the user is logged in when the app loads
    const user = localStorage.getItem('user');
    if (user) {
      console.log("user = ",user);
      setIsLoggedIn(true);
    }
  }, []);

  /*
    To prevent users from getting logged out when refreshing the page,
    you can utilize the local storage or session storage in the browser to persist the user's authentication status.

    the localStorage is used to store the user's authentication status.
    When the app loads, it checks if there is a user value stored in the local storage, and if it exists, 
    it sets the authentication status to true by calling setIsLoggedIn(true). 
    When the user logs out, the stored authentication status is removed from the local storage.

    By utilizing the local storage, the authentication status will persist even when the page is refreshed,
    ensuring that the user remains logged in.
  */

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('user', true); // Store the user's authentication status
  };

  const handleLoginFailure = (errorMessage) => {
    setIsLoggedIn(false);
    console.log(errorMessage);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Remove the stored authentication status
  };

  return (
    <BrowserRouter>
      <Context onLoginFailure={handleLoginFailure} onLoginSuccess={handleLoginSuccess}  onLogout={handleLogout} >
        {!isLoggedIn ? (
            <LoginForm />
        ) : (
          <>
              <Navbar  />
              <div className="container" style={{ marginLeft: "0" }}>
                <Stories />
                <Create />
                <Posts />
                <Sidebar />
              </div>
          </>
        )}
      </Context>
    </BrowserRouter>
  );
}

export default App;
