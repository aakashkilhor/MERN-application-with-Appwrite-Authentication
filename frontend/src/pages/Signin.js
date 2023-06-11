import React, { useState} from "react";
import { useContext } from 'react';
import AuthContext from "../context/AuthContext";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../config/config'

const Signin = () => {
  const { login, setUserId} = useContext(AuthContext);
//   const context = useContext(UserContext);
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn =async () => {
    try {
        // Send a POST request to the server to log in with the provided credentials
        const response = await axios.post(`${BASE_URL}/login`, {
          email,
          password
        });
        console.log(response)
    
        // Check if the request was successful
        if (response.data.current === true) {
          const receiveduserId = response.data.userId;
          // response.data.userId = response.data.$id
          setUserId(response.data.userId);
          login();

          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userId', receiveduserId);
          navigate("/");

          // Set the authentication token in local storage
          
        } else {
          response(response.data.message);
        }
      } catch (error) {
        console.error(error);
        error('An error occurred while logging in. Please try again later.');
      }
    
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <div className="container">
      <div>
          
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              
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
                      placeholder="Provide Your Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
              </div>
              <div className="innerbox">
                <div>
                  <label for="password" >
                    Password
                  </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
              </div>
                <button className="button" >
                  Sign In
                </button>
            </form>
          
      </div>
    </div>
  );
};

export default Signin;


// firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(res => {
    //     console.log(res);
    //     context.setUser({ email: res.user.email, uid: res.user.uid });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     toast(error.message, {
    //       type: "error"
    //     });
    //   });