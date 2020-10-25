import React from 'react';
import { Button } from 'react-bootstrap';
import searchLogo from '../../assets/search_icon.png';

class NavLogin extends React.Component {
  render() {
    return (
      <Button variant="clear" className="Button">
        <img alt="" src={searchLogo} width="20" height="20" />
      </Button>
    );
  }
}

export default NavLogin;
