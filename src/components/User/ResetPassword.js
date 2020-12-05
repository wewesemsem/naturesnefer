import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../../store';

const initial_state = { password: '', password2: '', error: '' };

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = initial_state;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    //check if token expired: GET auth/reset
  }
  handleChange(evt) {
    let state = { ...this.state };
    state[evt.target.name] = evt.target.value;
    this.setState(state);
  }
  handleClick(evt) {
    evt.preventDefault();
    const { handleSubmit, token } = this.props;
    if (evt.target.password.value !== evt.target.password2.value) {
      let state = { ...initial_state };
      state.error = 'Passwords must match.';
      this.setState(state);
    } else {
      this.setState(initial_state);
      handleSubmit(evt, token);
    }
  }
  render() {
    const { error, alert } = this.props;

    return (
      <Container className="Auth-page Center-column">
        <h1 className="Page-header">Reset Password</h1>
        {error && error.response && (
          <Alert variant="danger"> {error.response.data} </Alert>
        )}
        {this.state.error && (
          <Alert variant="danger"> {this.state.error} </Alert>
        )}
        {alert && <Alert variant="success"> {alert} </Alert>}
        <Form className="Form" onSubmit={this.handleClick}>
          <Form.Group>
            <Form.Control
              size="lg"
              type="password"
              placeholder="New Password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <Form.Control
              size="lg"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              required
              value={this.state.password2}
              onChange={this.handleChange}
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
    alert: state.user.alert,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, token) {
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
  alert: PropTypes.string,
};
