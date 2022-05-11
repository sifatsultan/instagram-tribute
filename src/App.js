import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/post/Post";
import postsData from "./postsData";
import { db } from "./firebase/FirebaseInit";
import { Modal, Typography } from "@material-ui/core";


function App() {
  const [posts, setPosts] = useState(postsData)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [open, setOpen] = useState(false)
  const handleSignup = () => setOpen(true)
  const handleClose = () => setOpen(false)
  

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data()
        }))
      )
    })
  }, [])

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography>Text in a model</Typography>

      </Modal>
      <div className="app__header">
        <div className="app__headerWrapper">
          <img
            src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram logo"
          />
          <button className="text__button">Logout</button>
          <div className="app__headerButtons">
            <button className="primary__button">Log in</button>
            <button className="text__button" onClick={handleSignup} >Sign up</button>
          </div>
        </div>
      </div>

      <div className="timeline">

        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}


export default App;