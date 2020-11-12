import React from 'react';
import { Button } from 'react-bootstrap';
import loginLogo from '../../assets/login_icon.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserAccount = ({ isLoggedIn }) => (
  <div>
    {isLoggedIn ? (
      <Button variant="clear">
        <Link to={'/user'}>
          <img alt="" src={loginLogo} className="Nav-icon" />
        </Link>
      </Button>
    ) : (
      <Button variant="clear">
        <Link to={'/login'}>
          <img alt="" src={loginLogo} className="Nav-icon" />
        </Link>
      </Button>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

export default connect(mapState)(UserAccount);

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
