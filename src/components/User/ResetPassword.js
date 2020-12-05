import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../../store';

class ResetPassword extends React.Component {
  componentDidMount() {
    //check if token expired: GET auth/reset
  }
  render() {
    const { handleSubmit, error, token } = this.props;

    return (
      <Container className="Auth-page Center-column">
        <h1 className="Page-header">Reset Password</h1>
        {error && error.response && (
          <Alert variant="danger"> {error.response.data} </Alert>
        )}
        <Form className="Form" onSubmit={(evt) => handleSubmit(evt, token)}>
          <Form.Group>
            <Form.Control
              size="lg"
              type="password"
              placeholder="New Password"
              name="password"
              required
            />
            <br />
            <Form.Control
              size="lg"
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              required
            />
          </Form.Group>
          <Button variant="info" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    error: state.user.error,
    token: ownProps.match.params.token,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, token) {
      evt.preventDefault();
      const password = evt.target.password.value;
      dispatch(reset(password, token));
    },
  };
};

export default connect(mapState, mapDispatch)(ResetPassword);

/**
 * PROP TYPES
 */
ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
