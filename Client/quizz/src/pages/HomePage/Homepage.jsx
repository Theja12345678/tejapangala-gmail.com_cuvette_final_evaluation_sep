import React, { useState } from 'react';
import "./HomePage.css"
import Login from '../../components/Auth/Login';
import Signup from '../../components/Auth/Signup';
const HomePage = () => {
    const [showLogin, setShowLogin] = useState(true);
return(
    <>
    <div className="container">
                <h1>Quizzz</h1>
                <div className="buttons">
                    <button className={showLogin ? 'active' : ''} onClick={() => setShowLogin(true)}>Login</button>
                    <button className={!showLogin ? 'active' : ''} onClick={() => setShowLogin(false)}>Signup</button>
                </div>
                <div className="form-container">
                    {showLogin ? < Login/> : <Signup />}
                </div>
            </div>
    </>
)
}
export default HomePage;