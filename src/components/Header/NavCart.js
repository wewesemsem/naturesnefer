import React from 'react';
import { Button } from 'react-bootstrap';
import cartLogo from '../../assets/cart_icon.png';

class NavCart extends React.Component {
  render() {
    return (
      <Button variant="clear">
        <img alt="" src={cartLogo} className="Nav-icon" />
      </Button>
    );
  }
}

export default NavCart;
