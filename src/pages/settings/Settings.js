import { useState, useEffect } from "react";
import "./settings.css";
import Sidebar from "../../component/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { update } from "../../redux/apicall";
import { signout } from "../../redux/apicall";
import { ThreeDots } from 'react-loader-spinner';

export default function Settings() {
  const user = useSelector((state) => state.currentUser);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState();
  const [waiting, setWaiting] = useState(false);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const currentUser = user.username;

  const dispatch = useDispatch();

  const PF = "https://blogg-server.onrender.com/images/";

  const { isFetching } = useSelector((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const updatedUser = {
      findusername: currentUser,
      userId: user._id,
      username,
      email,
      password,
    };

    // Local Files
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilepic = filename;

      try {
        await axios.post("https://blogg-server.onrender.com/api/upload", data);
      } catch (err) { }
    } try {
      update(dispatch, { ...updatedUser });
    } catch (err) { }
    setWaiting(false);
  };

  const handleDelete = async () => {
    setWaiting(true);
    try {
      if (user.profilepic) {
        await axios.delete(`https://blogg-server.onrender.com/api/delete/${user.profilepic}`);
      }
      await axios.delete(`https://blogg-server.onrender.com/api/user/${user._id}`, {
        data: { userId: user._id },
      });
      signout(dispatch);
    } catch (error) { }
    setWaiting(true);
  };

  return (
    <>
      {isFetching || waiting? <div style={style} >
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
      </div> : <div className="settings">
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
                <img src={PF + user.profilepic} alt="" />
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
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
          </form>
        </div>
        <Sidebar />
      </div>}
    </>
  );
}
