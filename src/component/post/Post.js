import "./post.css";

export default function Post() {
  return (
    <div className="post">
      <img
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        alt=""
        className="postImg"
      />

      <div className="postInfo">
        <div className="postCats">
          <spna className="postCat">Music</spna>
          <spna className="postCat">Life</spna>
        </div>
        <span className="postTitlt">Lorem ipsum dolor</span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
        sapiente debitis earum alias a. Architecto magnam veritatis nulla
        quibusdam repellat temporibus. Maxime obcaecati perferendis doloribus,
        eligendi placeat delectus alias voluptas.
      </p>
    </div>
  );
}
