import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/post/Post";
import postsData from "./postsData";
import { auth, db } from "./firebase/FirebaseInit";
import { makeStyles, Modal, Typography } from "@material-ui/core";
import ImageUpload from "./components/imageUpload/ImageUpload";


function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}


const useStyles = makeStyles(() => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: 24,
    padding: "30px 60px",
    borderRadius: "12px",
  }
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [openSignup, setOpenSignup] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState(postsData)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("onAuthStateChanged: authUser: ", authUser)
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [user, username])


  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }, [])


  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((err) => alert(err.message))

    setOpenSignup(false);
    setUsername("")
    setEmail("")
    setPassword("")
  }


  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenLogin(false);
    setEmail("")
    setPassword("")
  };



  return (
    <div className="app">


      {/* SIGN UP MODAL */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div>
            <img
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram original logo"
            />
          </div>
          <form className="app__signUp">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="primary__button" type="submit" onClick={signUp}
            >
              Sign up
            </button>
          </form>
        </div>
      </Modal>


      {/* LOGIN MODAL */}
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram original logo"
            />
          </center>
          <form className="app__signUp">
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary__button" type="submit" onClick={login}>Login</button>
          </form>
        </div>
      </Modal>



      <div className="app__header">
        <div className="app__headerWrapper">
          <img
            src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram logo"
          />

          {user ? (
            <button className="text__button" onClick={() => auth.signOut()}>Logout</button>
          ) : (
            <div className="app__headerButtons">
              <button
                className="primary__button"
                onClick={() => setOpenLogin(true)}
              >
                Log in
              </button>

              <button
                className="text__button"
                onClick={() => { setOpenSignup(true) }}
              >
                Sign up
              </button>
            </div>

          )}
        </div>
      </div>


      <div className="timeline">
        {user ? <ImageUpload user={user} /> : ''}

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