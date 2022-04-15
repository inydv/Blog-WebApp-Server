import { useEffect } from "react";
import "./single.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Singlepost from "../../component/singlepost/Singlepost";

export default function Single() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="single">
      <Singlepost />
      <Sidebar />
    </div>
  );
}
