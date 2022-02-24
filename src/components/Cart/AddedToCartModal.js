import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CartItem from './CartItem';

class AddToCartModal extends React.Component {
  render() {
    const handleClose = this.props.handleClose;
    const product = this.props.product;
    const quantity = this.props.quantity;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>This item was added to your bag.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product.name} ${product.price} Quantity: {quantity}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" href="/shopping-cart">
            VIEW BAG
          </Button>
          <Button variant="primary" onClick={handleClose}>
            KEEP SHOPPING
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default AddToCartModal;
