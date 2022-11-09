import TopBar from "./component/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/singlepage/Single";
import Write from "./pages/write/Write";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

function App() {
  const user = useSelector((state) => state.currentUser);

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post/:postId" element={<Single />} />
        <Route exact path="/write" element={user ? <Write /> : <Register />} />
        <Route
          exact
          path="/settings"
          element={user ? <Settings /> : <Register />}
        />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
