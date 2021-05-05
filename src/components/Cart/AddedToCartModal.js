import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CartItem from './CartItem'

class AddToCartModal extends React.Component {
  
  render() {
    const handleClose = this.props.handleClose;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>ADDED TO BAG</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
