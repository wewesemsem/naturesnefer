import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <Container className="Auth-page">
        <h1 className="Page-header">Login</h1>
        <Form className="Form">
          <Form.Group>
            <Form.Control size="lg" type="text" placeholder="Email" />
            <br />
            <Form.Control size="lg" type="text" placeholder="Password" />
          </Form.Group>
          <Button variant="info" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="Auth-links">
          <Link to={'/signup'} className="Auth-link">
            Create Account
          </Link>
          <Link to={'/forgot-password'} className="Auth-link">
            Forgot Password?
          </Link>
        </div>
      </Container>
    );
  }
}

export default Login;
