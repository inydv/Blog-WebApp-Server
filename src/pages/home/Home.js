import { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import Posts from "../../component/posts/Posts";
import Sidebar from "../../component/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://blogg-server.onrender.com/api/posts" + search);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      {loading ? <div style={style} >
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
      </div> : <>
        <Header />
        <div className="home">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </>}
    </div>
  );
}
