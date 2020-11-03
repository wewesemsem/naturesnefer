import React from 'react';
import { Button } from 'react-bootstrap';
import loginLogo from '../../assets/login_icon.png';

class NavLogin extends React.Component {
  render() {
    return (
      <Button variant="clear">
        <img alt="" src={loginLogo} className="Nav-icon" />
      </Button>
    );
  }
}

export default NavLogin;
