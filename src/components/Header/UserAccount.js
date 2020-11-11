import React from 'react';
import { Button } from 'react-bootstrap';
import loginLogo from '../../assets/login_icon.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UserAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '/login',
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) this.setState({ url: '/user' });
    this.setState({ url: '/login' });
  }

  render() {
    return (
      <Button variant="clear">
        <Link to={this.state.url}>
          <img alt="" src={loginLogo} className="Nav-icon" />
        </Link>
      </Button>
    );
  }
}

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
