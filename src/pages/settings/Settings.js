import { useState, useEffect } from "react";
import "./settings.css";
import Sidebar from "../../component/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { update } from "../../redux/apicall";
import { signout } from "../../redux/apicall";

// firebase Start
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../../firebase";
// firebase End

export default function Settings() {
  const user = useSelector((state) => state.currentUser);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(false);

  const currentUser = user.username;

  const dispatch = useDispatch();

  // Local Files
  // const PF = "http://localhost:5000/images/";

  const { isFetching, error } = useSelector((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      findusername: currentUser,
      userId: user._id,
      username,
      email,
      password,
    };

    // Local Files
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   updatedUser.profilepic = filename;

    //   try {
    //     await axios.post("upload", data);
    //   } catch (err) {}
    // }

    // Firebase Start
    if (file) {
      const filename = Date.now() + file.name;
      setWaiting(true);
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
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedUser.profilepic = downloadURL;
            update(dispatch, { ...updatedUser });
            setWaiting(false);
          });
        }
      );
    } else {
      update(dispatch, { ...updatedUser });
    }
    // firebase End
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`user/${user._id}`, {
        data: { userId: user._id },
      });
      signout(dispatch);
    } catch (error) { }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : (
              // Local Files
              // <img src={PF + user.profilepic} alt="" />

              // Firebase
              <img src={user.profilepic} alt="" />
            )}
            <label htmlFor="FileInput">
              <i className="settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="FileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {waiting ? (
            <div className="settingsSubmit wait">
              Updating
            </div>
          ) : (
            <button
              className="settingsSubmit"
              type="submit"
              disabled={isFetching}
            >
              Update
            </button>
          )}
          {!error && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
