import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

class AccountInfo extends React.Component {
  render() {
    const handleClick = this.props.handleClick;
    const user = this.props.user;
    const firstName = user.firstName;
    return (
      <Container className="Center-column">
        <h1 className="Page-header">Account</h1>
        <div className="Words"> Welcome to your account, {firstName}!</div>
        <a href="/login" className="Logout" onClick={handleClick}>
          Sign Out
        </a>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountInfo);

AccountInfo.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
