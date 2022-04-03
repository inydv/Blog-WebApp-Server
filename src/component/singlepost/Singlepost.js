import "./singlepost.css";

export default function Singlepost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">
          Lorem ipsum, dolor
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePageAuthor">
            Author: <b>Nitin</b>
          </span>
          <span className="singlePostDate">1 Hour Ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio numquam
          illum laborum explicabo? Natus reprehenderit cum tenetur rem sint ex,
          adipisci expedita inventore iure optio nisi culpa autem, itaque at.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
          obcaecati architecto officiis distinctio nesciunt quia facere, eos
          delectus nihil fuga et impedit facilis, molestias neque tempora
          doloribus error ut nostrum? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maiores delectus, natus deserunt quis explicabo, ab,
          quos consequatur modi recusandae inventore reiciendis! Soluta quo
          atque sed consequatur autem maxime consequuntur eos.
        </p>
      </div>
    </div>
  );
}
