import { useState, useEffect } from "react";
import "./singlepost.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../firebase";

export default function Singlepost() {
  // const PF = "https://bloogg.herokuapp.com/images/";

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`https://bloogg.herokuapp.com/api/posts/${path}`, {
        data: {
          username: user?.username,
        },
      });
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path, user?.username]);

  const handleDelete = async () => {
    try {
      if (post.photo) {
        let pic_name = post.photo.split("/")[7].split("?")[0].split('%20').join(' ');
        const storage = getStorage(app);

        // Create a reference to the file to delete
        const desertRef = ref(storage, pic_name);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("Deleted");
          })
          .catch((error) => {
            console.log("Uh-oh, an error occurred!");
          });
      }
      await axios.delete(`https://bloogg.herokuapp.com/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) { }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://bloogg.herokuapp.com/api/posts/${post._id}`, {
        username: user.username,
        title: title, // title
        desc: desc, // desc
      });
      setUpdateMode(false);
    } catch (error) { }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          // <img src={PF + post.photo} alt="" className="singlePostImg" />
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePageAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
