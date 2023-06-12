import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../config/config";

const Signups = () => {
  const { login, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      // Send a POST request to the server to create a new user with the provided information
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        // response.data.userId = response.data.$id
        setUserId(response.data.userId);
        const receiveduserId = response.data.userId;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", receiveduserId);
        login();
        navigate("/");
      } else {
        // Display an error message
        response(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup here</h1>
        <div className="innerbox">
          <div>
          <label for="name" >
            Name
          </label>
          </div>
          <div>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="provide your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="innerbox">
          <div>
          <label for="email">
            Email
          </label>
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="provide your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="innerbox">
          <div>
          <label for="password">
            Password
          </label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signups;
