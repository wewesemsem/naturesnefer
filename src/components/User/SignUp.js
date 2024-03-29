import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, me } from '../../store';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <Container className="pad-t Center-column">
        <h1 className="Page-header">Create Account</h1>
        {error && error.response && (
          <Alert variant="danger"> {error.response.data} </Alert>
        )}
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
        <div className="Auth-links">
          <Link to={'/login'} className="Auth-link">
            Login Instead
          </Link>
          <span>·</span>
          <Link to={'/'} className="Auth-link">
            Return to Shop
          </Link>
        </div>
      </Container>
    );
  }
}

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
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(SignUp);

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
