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
        <Container className="Center-column">
          <h2 className="Page-header">Shopping Bag</h2>
          <ListGroup variant="flush" className="Form">
            {cartItems.map((item) => {
              return <CartItem cartItem={item} />;
            })}
          </ListGroup>
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
