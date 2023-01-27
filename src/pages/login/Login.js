import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { login } from "../../redux/apicall";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loader-spinner';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <>
      {isFetching ? <div style={style} >
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#000000"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div> : <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
          {error && <span className="error">Something Went Wrong...</span>}
        </form>
        <button className="loginRegisterButton">
          <Link to="/register" className="link">
            Register
          </Link>
        </button>
      </div>}
    </>

  );
}
