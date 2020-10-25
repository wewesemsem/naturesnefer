import React from 'react';
import { Button } from 'react-bootstrap';
import searchLogo from '../../assets/search_icon.png';

class NavLogin extends React.Component {
  render() {
    return (
      <Button variant="clear">
        <img alt="" src={searchLogo} className="Nav-icon" />
      </Button>
    );
  }
}

export default NavLogin;
