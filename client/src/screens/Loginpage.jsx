import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { API_BASE_URL } from '../api/myApi'
import Loader from "../components/Loader";
import Error from "../components/Error";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loginBtn = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const result = (
        await axios.post(`${API_BASE_URL}/api/users/login`, user)
      ).data;
      setLoading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }

    // console.log(user);
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={"Invalid Credentials"} />}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={loginBtn}>
              Login
            </button>

            <Link to={"/register"}>
              <div className="clickHere mt-3">
                <p>Click here to register</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
