import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOpenCartItemsThunk } from '../../store';
import CartItem from './CartItem';

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems();
  }
  render() {
    const cartItems = this.props.cartItems;
    console.log(cartItems);
    if (!cartItems || !cartItems.length) {
      return <div>Your cart is empty!</div>;
    } else
      return (
        <Container className="pad-t R-clm">
          <h2 className="Page-header">Shopping Bag</h2>
          <Card border="light" className="Form">
            <div className="Nav-right spc-btwn pad2">
              <Card.Title>Product</Card.Title>
              <Card.Title>Price</Card.Title>
            </div>
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return <CartItem cartItem={item} />;
              })}
            </ListGroup>
          </Card>
          <Card className="Form Center-column pad2">
            <Card.Title>Subtotal $100.00</Card.Title>
            <Card.Title>Checkout</Card.Title>
          </Card>
        </Container>
      );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartItems: () => dispatch(getOpenCartItemsThunk()),
  };
};

export default connect(mapState, mapDispatch)(Cart);

/**
 * PROP TYPES
 */
Cart.propTypes = {
  cartItems: PropTypes.object,
};
