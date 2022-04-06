import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpaperbat.com/img/225961-hd-bright-wallpaper.jpg"
        alt=""
      />
    </div>
  );
}
