import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import Footer from "./Footer";

// styles for modal copied from material ui
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 5),
    borderRadius: 4,
  },
}));

// App component starts here
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  // appilication state
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  //use effects lie here
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      //perform some clean up
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  //functions for handling signup and signin
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) setOpen(false);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(setOpenSignIn(false))
      .catch((err) => alert(err.message));
  };
  // return-------------------------------------------------------------------------------------------
  return (
    <div className="app">
      {/* signin modal starts here */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="modal_content">
            {/* modal instagram image */}
            <img
              className="model_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
              alt=""
            />
            {/* form starts here */}
            <form>
              <div className="modal_content">
                {/* username */}
                <label>Username</label>
                <input
                  className="modal_input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {/* email */}
                <label>Email</label>
                <input
                  className="modal_input"
                  type="text"
                  placeholder="eg. mail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* password */}
                <label>Password</label>
                <input
                  className="modal_input"
                  type="password"
                  placeholder="enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* submit button */}
                <button onClick={signUp} className="modal_button">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* login modal starts here */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="modal_content">
            {/* modal instagram image */}
            <img
              className="model_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
              alt=""
            />
            {/* form starts here */}
            <form>
              <div className="modal_content">
                {/* email */}
                <label>Email</label>
                <input
                  className="modal_input"
                  type="text"
                  placeholder="eg. mail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* password */}
                <label>Password</label>
                <input
                  className="modal_input"
                  type="password"
                  placeholder="enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* submit button */}
                <button onClick={signIn} className="modal_button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* app header starts here */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt=""
        />
        {user ? (
          <Button className="header-btn" onClick={() => auth.signOut()}>
            Logout
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button className="header-btn" onClick={() => setOpen(true)}>
              Sign Up
            </Button>
            <Button className="header-btn" onClick={() => setOpenSignIn(true)}>
              Login
            </Button>
          </div>
        )}
      </div>

      {/* posts starts from here */}
      <div className="app__main">
        <div className="app__upload">
          {/* upload post */}
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3 className="login-to-uploadmsg">Signup to Post images</h3>
          )}
        </div>
        <div className="app__posts">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              avatarUrl={post.avatarUrl}
              postId={id}
              user={user}
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
