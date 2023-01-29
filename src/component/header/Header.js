import "./header.css";

export default function Header() {
  const PF = "https://blogg-server.onrender.com/images/";

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Write To</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src={PF + "banner.jpg"}
        alt=""
      />
    </div>
  );
}
