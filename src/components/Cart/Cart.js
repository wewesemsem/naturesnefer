import React from 'react';
import { Card, Container, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOpenCartItemsThunk } from '../../store';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

const calculateTotol = (arr) => {
  let subTotal = 0;
  arr.forEach((item) => {
    subTotal += item.quantity * item.price;
  });
  return subTotal;
};

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems();
  }
  render() {
    const cartItems = this.props.cartItems;
    const subTotal = calculateTotol(cartItems);
    if (!cartItems || !cartItems.length) {
      return <EmptyCart />;
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
          <Card className="Form L-clm pad2">
            <Card.Title>Subtotal ${subTotal}</Card.Title>
            <Button>Checkout</Button>
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
