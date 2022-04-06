import TopBar from "./component/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/singlepage/Single";
import Write from "./pages/write/Write";
import { Switch, Route } from "react-router-dom";

function App() {
  const user = false;
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post/:postId">
          <Single />
        </Route>
        <Route exact path="/write">
          {user ? <Write /> : <Register />}
        </Route>
        <Route exact path="/settings">
          {user ? <Settings /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Home /> : <Register />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
