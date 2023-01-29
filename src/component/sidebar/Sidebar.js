import { useState, useEffect } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  useEffect(() => {
    const getCats = async () => {
      setWaiting(true);
      const res = await axios.get("https://blogg-server.onrender.com/api/categories");
      setCats(res.data);
      setWaiting(false);
    };
    getCats();
  }, []);

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
      </div> : <div className="sidebar">
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
      </div>}
    </>
  );
}
