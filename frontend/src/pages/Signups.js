import React, { useState } from "react";
import {Container,Form,Button,FormGroup,Label,Col,Input,Row,Card,CardBody,CardFooter,CardHeader} from "reactstrap";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Signups = () => {
  const { login, setUserId} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async() => {
    try {
      // Send a POST request to the server to create a new user with the provided information
      const response = await axios.post('http://localhost:4000/signup', {
        name,
        email,
        password
      });
      
      if(response.status===200){
        setUserId(response.data.userId)
        login();
       navigate("/");
      }
      
       else {
        // Display an error message
        response(response.message);
      }
    } catch (error) {
        console.log(error);
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
              <CardHeader className="">Signup here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="name" sm={3}>
                    Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="name"
                      name="name"
                      id="name"
                      placeholder="provide your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Col>
                </FormGroup>
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
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signups;



