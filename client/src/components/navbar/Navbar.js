import React, { useEffect, useState } from "react";
import './navbar.css';
import notification from "../../images/notification.png";
import message from "../../images/message.png";
import settings from "../../images/settings.png";

export function Navbar({username, socket}) {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        socket.on("getNotification", data => {
            setNotifications((prev) => [...prev, data])
        });
    },[socket]);

    const displayNotification = ({senderName, type, liked}) => {
        let action;

        switch (type) {
            case 1:
                action = "liked";
                break;
            case 2:
                action = "commented on";
                break;
            case 3:
                action = "shared";
                break;
            default:
                action = "";
                break;
        };

        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        );
    };

    const handleClickNotification = () => {

        if(!open && notifications.length === 0) {
            return;
        }

        setOpen(!open);

        if (open) {
            setNotifications([]);
        }
    }

    return (
        <div className="navbar">
           <span className="usename-nav">Hi {username}</span>
           <div className="icons">
            <div className="icon" onClick={handleClickNotification}>
                <img src={notification} alt="notification" className="iconImg"/>
                {notifications.length > 0 && <div className="counter">{notifications.length}</div>}
            </div>
            <div className="icon">
                <img src={message} alt="notification" className="iconImg"/>
                {/* <div className="counter"></div> */}
            </div>
            <div className="icon">
                <img src={settings} alt="notification" className="iconImg"/>
                {/* <div className="counter"></div> */}
            </div>
           </div>
           {open && (
                <div className="notifications">
                    {notifications.map(n=>(
                        displayNotification(n)
                    ))}
                </div>
           )}
        </div>
    );
}