import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, me } from '../../store';

class Login extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <Container className="Auth-page">
        <h1 className="Page-header">Login</h1>
        <Form className="Form" onSubmit={handleSubmit}>
          <Form.Group>
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
            Sign In
          </Button>
        </Form>
        <div className="Auth-links">
          <Link to={'/signup'} className="Auth-link">
            Create Account
          </Link>
          <span>·</span>
          <Link to={'/forgot-password'} className="Auth-link">
            Forgot Password?
          </Link>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
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
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, 'login'));
    },
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Login);

/**
 * PROP TYPES
 */
Login.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
