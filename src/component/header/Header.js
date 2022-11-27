import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Write To</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://newevolutiondesigns.com/images/freebies/cool-4k-wallpaper-2.jpg"
        alt=""
      />
    </div>
  );
}
