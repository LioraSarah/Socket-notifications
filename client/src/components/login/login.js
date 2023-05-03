import React, { useState } from "react";
import "./login.css";

export function Login({setAppUser}) {

    const [username, setUsername] = useState("");

    const handleSetUser = (e) => {
        setUsername(e.target.id);
    }

    const isClicked = (user) => {
        return username === user;
    }

    return (
        <div className="login">
            <h2>Please choose a user and log in</h2>
            <button id="LuckyLuke" className={isClicked("LuckyLuke") ? "active" : "notActive"} onClick={handleSetUser}>LuckyLuke</button>
            <button id="Darth666" className={isClicked("Darth666") ? "active" : "notActive"} onClick={handleSetUser}>Darth666</button>
            <button onClick={() => setAppUser(username)} className="login-button">Login</button>

            <p>*(Please open two seprate windows and connect to both users at once to see live communication through sockets)</p>
            <p>*(After log in to all users feel free to press on the reactions below the photos to see live notofications)</p>
        </div>
    );
}