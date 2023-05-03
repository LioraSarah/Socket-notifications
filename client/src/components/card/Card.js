import React, { useState } from "react";
import "./card.css";
import like from "../../images/like2.png";
import comment from "../../images/comment2.png";
import share from "../../images/share2.png";
import dots from "../../images/dots2.png";
import likedHeart from "../../images/liked.png";

export function Card({post, socket, user}) {

    const [liked, setLiked] = useState(false);
    
    const handleNotification = (type) => {

        switch(type) {
            case 1: 
                setLiked(!liked);
                break;
            default: 
                break;
        }

        socket.emit("sendNotification", {
            senderName: user,
            recieverName: post.username,
            type,
            liked
        });
    }

    return (
        <div className="card">
            <div className="info">
                <img src={`../../images/${post.userImg}`} alt="" className="userImage"/>
                <span className="user">{post.username}</span>&nbsp;posted:
            </div>
            <div className="post-content">
                <p className="postTxt">{post.postText}</p>
                <img src={`../../images/${post.postImg}`} alt="" className="postImage" />
            </div>
            <div className="interactions">
                { liked ? (
                    <img src={likedHeart} alt="liked" className="cardIcon" onClick={() => handleNotification(1)}/>
                ) : (
                    <img src={like} alt="like" className="cardIcon" onClick={() => handleNotification(1)}/>
                )}
                <img src={comment} alt="comment" className="cardIcon" onClick={() => handleNotification(2)}/>
                <img src={share} alt="share" className="cardIcon" onClick={() => handleNotification(3)}/>
                <img src={dots} alt="info" className="cardIcon"/>
            </div>
        </div>
    );
};
