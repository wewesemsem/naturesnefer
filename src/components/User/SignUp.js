import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  render() {
    return (
      <Container className="Auth-page">
        <h1 className="Page-header">Create Account</h1>
        <Form className="Form">
          <Form.Group>
            <Form.Control size="lg" type="text" placeholder="First Name" />
            <br />
            <Form.Control size="lg" type="text" placeholder="Last Name" />
            <br />
            <Form.Control size="lg" type="text" placeholder="Email" />
            <br />
            <Form.Control size="lg" type="text" placeholder="Password" />
          </Form.Group>
          <Button variant="info" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
