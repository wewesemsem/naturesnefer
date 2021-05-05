import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    return (
      <Container className="pad18 Center-column">
        <h1 className="Words pad2">Your shopping cart is empty.</h1>
        <Button variant="outline-success">
          <Link to={'/shop-all'}>Shop Now</Link>
        </Button>
      </Container>
    );
  }
}

export default CartButton;
