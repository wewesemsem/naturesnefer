import React from 'react';
import { Button } from 'react-bootstrap';
import cartLogo from '../../assets/cart_icon.png';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    return (
      <div>
        <Button variant="clear">
          <Link to={'/shopping-cart'}>
            <img alt="" src={cartLogo} className="Nav-icon" />
          </Link>
        </Button>
      </div>
    );
  }
}

export default CartButton;
