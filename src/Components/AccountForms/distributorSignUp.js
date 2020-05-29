import React from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export const distributorSignUp = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        overflow: "auto",
        margin: "20vh auto",
      }}
    >
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="email" placeholder="User ID" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          type="submit"
          style={{
            backgroundColor: "#b11917",
            border: "none",
            width: "100%",
            margin: "10px 0 10px 0",
          }}
        >
          Sign up
        </Button>
        <p>
          Aalready have an account?{" "}
          <Link to="/distributor/signin">
            <span
              style={{
                color: "#b11917",
              }}
            >
              Log in!
            </span>
          </Link>
        </p>
      </Form>
    </Container>
  );
};
