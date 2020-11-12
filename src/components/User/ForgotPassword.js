import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../store';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component {
  render() {
    const { handleSubmit, error } = this.props;

    return (
      <Container className="Auth-page R-clm">
        <h2 className="Page-header">Reset Password</h2>
        <div className="Words Btm-pad">
          We will send you an email with a link to reset your password.
        </div>
        {error && error.response && (
          <Alert variant="danger"> {error.response.data} </Alert>
        )}
        <Form className="Form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </Form.Group>
          <Button variant="info" type="submit">
            Send
          </Button>
          <Link to={'/login'} className="Auth-link">
            Cancel
          </Link>
        </Form>
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
      dispatch(auth(email));
    },
  };
};

export default connect(mapState, mapDispatch)(ForgotPassword);

/**
 * PROP TYPES
 */
ForgotPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
