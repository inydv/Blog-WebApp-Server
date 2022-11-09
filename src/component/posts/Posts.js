import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.length ? (
        posts.map((item) => <Post post={item} key={item._id} />)
      ) : (
        <h3 style={{ margin: "0px 20px", color: "red" }}>
          Nothing Pusblished Yet...
        </h3>
      )}
    </div>
  );
}
