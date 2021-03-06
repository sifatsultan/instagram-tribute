import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";


function Post({ id, username, caption, imageUrl }) {
    return (
        <div id={id} className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3 className="post__username">{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt="" />
            <h4 className="post__text">
                <strong>{username}</strong> {caption}
            </h4>
        </div>
    )
}

export default Post;