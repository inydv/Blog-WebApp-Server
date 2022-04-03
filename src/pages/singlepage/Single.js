import "./single.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Singlepost from "../../component/singlepost/Singlepost";

export default function Single() {
  return (
    <div className="single">
      <Singlepost />
      <Sidebar />
    </div>
  );
}
