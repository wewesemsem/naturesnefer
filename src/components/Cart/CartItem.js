import React from 'react';
import { ListGroup } from 'react-bootstrap';

class CartItem extends React.Component {
  render() {
    const cartItem = this.props.cartItem;
    return (
      <ListGroup.Item>
        <div className="Nav-right">{cartItem.name} {cartItem.price} {cartItem.quantity}</div>
      </ListGroup.Item>
    );
  }
}

export default CartItem;
