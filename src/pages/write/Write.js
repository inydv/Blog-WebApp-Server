import { useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { useSelector } from "react-redux";

// firebase Start
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../../firebase";
// firebase End

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function post(newPost) {
    const res = await axios.post("/posts", newPost);
    window.location.replace("/post/" + res.data._id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cat,
    };

    // Local Files
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.photo = filename;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {}
    // }
    // try {
    //   const res = await axios.post("/posts", newPost);
    //   window.location.replace("/post/" + res.data._id);
    // } catch (err) {}

    // Firebase Start
    if (file) {
      const filename = Date.now() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newPost.photo = downloadURL;
            post(newPost);
          });
        }
      );
    } else {
      post(newPost);
    }
    // firebase End
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title..."
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="category">
          <span className="categoryTitle">Category : </span>
          <select className="select" onChange={(e) => setCat(e.target.value)}>
            <option className="option" value="select" disabled>
              select
            </option>
            <option className="option" value="Food">
              Food
            </option>
            <option className="option" value="Travel">
              Travel
            </option>
            <option className="option" value="Health & Fitness">
              Health & Fitness
            </option>
            <option className="option" value="Lifestyle">
              Lifestyle
            </option>
            <option className="option" value="Fashion & Beauty">
              Fashion & Beauty
            </option>
            <option className="option" value="Photography">
              Photography
            </option>
            <option className="option" value="Personal">
              Personal
            </option>
            <option className="option" value="Music">
              Music
            </option>
            <option className="option" value="Business">
              Business
            </option>
            <option className="option" value="Art & Design">
              Art & Design
            </option>
            <option className="option" value="Book & Writing">
              Book & Writing
            </option>
            <option className="option" value="Sports">
              Sports
            </option>
            <option className="option" value="News">
              News
            </option>
            <option className="option" value="Movie">
              Movie
            </option>
            <option className="option" value="Religion">
              Religion
            </option>
            <option className="option" value="Political">
              Political
            </option>
          </select>
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            className="writeInput writeText"
            placeholder="Tell Your Strory..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
