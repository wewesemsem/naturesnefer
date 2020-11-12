import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../store';

const SignUp = (props) => {
  const { handleSubmit, error } = props;
  
  return (
    <Container className="Auth-page">
      <h1 className="Page-header">Create Account</h1>
      <Form className="Form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            placeholder="First Name"
            name="firstName"
            required
          />
          <br />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
          />
          <br />
          <Form.Control
            size="lg"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <Form.Control
            size="lg"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Sign Up
        </Button>
      </Form>
      {error && error.response && <div> {error.response.data} </div>}
    </Container>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, 'signup', firstName, lastName));
    },
  };
};

export default connect(mapState, mapDispatch)(SignUp);

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
