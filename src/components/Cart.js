import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOpenCartItemsThunk } from '../store';

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems();
  }
  render() {
    return (
      <div className="cartAnchor">
        <Card className="shoppingCart">
          <Card.Body>
            <Card.Title>Your Cart</Card.Title>
            <Card.Text>Your shopping cart is empty!</Card.Text>
            <Card.Link href="#">Shop Here!</Card.Link>
          </Card.Body>
        </Card>
      </div>
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
