import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Success from "../components/Success";
import { API_BASE_URL } from '../api/myApi'

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerBtn = async () => {
    if (!name || !email || !password || !cpassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== cpassword) {
      alert("Password not matched");
      return;
    }
    const user = {
      name,
      email,
      password,
    };
    // console.log(user)

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/users/register`, user);
      setSuccess(response.data);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      console.log(error.response?.data); // Log the server response
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registered Successfully, Login to continue" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="password"
              placeholder="confirm password"
              className="form-control"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={registerBtn}>
              Register
            </button>

            <Link to={"/login"}>
              <div className="clickHere mt-3">
                <p>Click here to login</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
