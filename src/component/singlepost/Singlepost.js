import { useState, useEffect } from "react";
import "./singlepost.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThreeDots } from 'react-loader-spinner';

export default function Singlepost() {
  const PF = "https://blogg-server.onrender.com/images/";

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    const getPost = async () => {
      setWaiting(true);
      const res = await axios.get(`https://blogg-server.onrender.com/api/posts/${path}`, {
        data: {
          username: user?.username,
        },
      });
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setWaiting(false);
    };
    getPost();
  }, [path, user?.username]);

  const handleDelete = async () => {
    setWaiting(true);
    try {
      if (post.photo) {
        await axios.delete(`https://blogg-server.onrender.com/api/delete/${post.photo}`);
      }
      await axios.delete(`https://blogg-server.onrender.com/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) { }
    setWaiting(false);
  };

  const handleUpdate = async () => {
    setWaiting(true);
    try {
      await axios.put(`https://blogg-server.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title: title, // title
        desc: desc, // desc
      });
      setUpdateMode(false);
    } catch (error) { }
    setWaiting(false);
  };

  return (
    <>
      {waiting ? <div style={style} >
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#000000"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div> : <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
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
      </div>}
    </>
  );
}
