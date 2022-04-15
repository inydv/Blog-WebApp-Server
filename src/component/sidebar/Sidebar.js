import { useState, useEffect } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="image"
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/01/anime-characters-11-61deafe35fb99__700.jpg"
          alt=""
        />
        <p>
          Hello, I'm Lokesh Yadav <br /> A Full stack Developer <br />
          Building quality websites and applications with HTML, CSS, and
          JavaScript with Front-end Libraries React including Back-end Library
          Node.js, Express.js and Database MongoDB.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((item) => (
            <Link className="link" key={item._id} to={`/?cat=${item.name}`}>
              <li className="sidebarListItem">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a
            href="https://www.facebook.com/Nitin9900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/lokesh-yadav-31318a225/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://instagram.com/i_nydv?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
