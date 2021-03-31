import React from 'react';
import { Button } from 'react-bootstrap';
import cartLogo from '../../assets/cart_icon.png';
import Cart from '../Cart';

class CartButton extends React.Component {
  constructor() {
    super();
    this.state = { toggled: false };
    this.toggleCart = this.toggleCart.bind(this);
  }
  toggleCart(evt) {
    const prevState = this.state.toggled;
    this.setState({
      toggled: !prevState,
    });
  }
  render() {
    return (
      <div>
        <Button variant="clear" onClick={this.toggleCart}>
          <img alt="" src={cartLogo} className="Nav-icon" />
        </Button>
        {this.state.toggled && <Cart />}
      </div>
    );
  }
}

export default CartButton;
