import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgot } from '../../store';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = { email: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({ email: evt.target.value });
  }
  handleClick(evt) {
    const { handleSubmit } = this.props;
    evt.preventDefault();
    this.setState({ email: '' });
    handleSubmit(evt);
  }
  render() {
    const { error, alert } = this.props;

    return (
      <Container className="pad-t R-clm">
        <h2 className="Page-header">Forgot Password</h2>
        <div className="Words Btm-pad">
          We will send you an email with a link to reset your password.
        </div>
        {error && error.response && (
          <Alert variant="danger"> {error.response.data} </Alert>
        )}
        {alert && <Alert variant="success"> {alert} </Alert>}
        <Form className="Form" onSubmit={this.handleClick}>
          <Form.Group>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleChange}
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
    alert: state.user.alert,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      const email = evt.target.email.value;
      dispatch(forgot(email));
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
  alert: PropTypes.string,
};
