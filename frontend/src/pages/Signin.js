import React, { useState} from "react";
import { useContext } from 'react';
import AuthContext from "../context/AuthContext";
import axios from "axios"
import {Container,Form,Button,FormGroup,Label,Col,Input,Row,Card,CardBody,CardFooter,CardHeader} from "reactstrap";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { Navigate } from "react-router-dom";

const Signin = () => {
  const { login, setUserId} = useContext(AuthContext);
//   const context = useContext(UserContext);
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp =async () => {
    try {
        // Send a POST request to the server to log in with the provided credentials
        const response = await axios.post('http://localhost:4000/login', {
          email,
          password
        });
        console.log(response)
    
        // Check if the request was successful
        if (response.data.current === true) {
          setUserId(response.data.userId);
          login();
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
    handleSignUp();
  };

  return (
    <Container className="text-center">
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">Signin here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="provide your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="your password here"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" block color="primary">
                  Sign In
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
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