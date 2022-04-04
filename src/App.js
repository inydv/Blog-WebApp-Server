import TopBar from "./component/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/singlepage/Single";
import Write from "./pages/write/Write";
import { Switch, Route } from "react-router-dom";

function App() {
  const user = true;
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/post/:postId" component={() => <Single />} />
        <Route
          exact
          path="/write"
          component={user ? <Write /> : <Register />}
        />
        <Route
          exact
          path="/settings"
          component={user ? <Settings /> : <Register />}
        />
        <Route exact path="/login" component={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          component={user ? <Home /> : <Register />}
        />
      </Switch>
    </div>
  );
}

export default App;
