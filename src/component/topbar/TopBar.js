import "./topbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../redux/apicall";

export default function TopBar() {
  const user = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  // Local Files
  // const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    signout(dispatch);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <a
          href="https://www.facebook.com/Nitin9900"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fa-brands fa-facebook-square"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/lokesh-yadav-31318a225/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://instagram.com/i_nydv?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fa-brands fa-instagram-square"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          user.profilepic ? (
            <Link to="/settings">
              <img className="topImg" src={user.profilepic} alt="" />
            </Link>
          ) : (
            <Link to="/settings">
              <i className="fa-solid fa-user" style={{ cursor: "pointer" }}></i>
            </Link>
          )
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
