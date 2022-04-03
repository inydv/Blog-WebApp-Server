import TopBar from "./component/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/singlepage/Single";
import Write from "./pages/write/Write";

function App() {
  return (
    <div className="App">
      <TopBar />
      {/* <Home /> */}
      {/* <Single /> */}
      <Write />
    </div>
  );
}

export default App;
