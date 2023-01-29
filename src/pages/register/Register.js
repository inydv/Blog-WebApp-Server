import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      setLoading(true);
      const res = await axios.post("https://blogg-server.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });
      setLoading(false);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {loading ? <div style={style} >
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
      </div> : <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your Username..."
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="registerButton" type="submit">
            Register
          </button>
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
              something went wrong!
            </span>
          )}
        </form>
        <button className="registerLoginButton">
          <Link to="/login" className="link">
            LOGIN
          </Link>
        </button>
      </div>}
    </>

  );
}
