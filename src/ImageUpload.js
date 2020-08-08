import React, { useState } from "react";
import firebase from "firebase";
import "./ImageUpload.css";
import { db, storage } from "./firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
        alert(err.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageUpload">
      <h2>Create a New Post</h2>
      <label className="imageUpload__lable">Enter Caption:</label>
      <textarea
        placeholder="Enter a caption here..."
        className="imageUpload__captionenter"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <div className="fileupload-div">
        <label className="imageUpload__lable">Upload image:</label>
        <progress value={progress} max="100" />
        <input
          className="imageUpload__fileenter"
          type="file"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleUpload} className="imageUpload__btn">
        Upload Post
      </button>
    </div>
  );
}

export default ImageUpload;
