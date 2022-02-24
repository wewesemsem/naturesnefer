import React from 'react';
import { Container, Card, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductById, addToCart } from '../../store';
import AddedToCartModal from '../Cart/AddedToCartModal';
import ItemQuantity from '../Cart/ItemQuantity';
import { getOpenCartItemsThunk } from '../../store';
const MAX_QTY_PER_ITEM = 5;

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      alert: false,
      remainingQuantityAllowed: MAX_QTY_PER_ITEM,
      quantity: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(this.props.productId);
  }
  addToCart(evt, quantity) {
    evt.preventDefault();
    this.props.getCartItems();
    const product = this.props.product;
    const cartItems = this.props.cartItems;
    let verifiedQty = true;

    for (let i = 0; i < cartItems.length; i++) {
      let cartItem = cartItems[i];
      if (cartItem.name === product.name) {
        if (
          parseInt(cartItem.quantity) + parseInt(quantity) >
          MAX_QTY_PER_ITEM
        ) {
          const remainingQuantityAllowed =
            MAX_QTY_PER_ITEM - parseInt(cartItem.quantity);
          this.showAlert(remainingQuantityAllowed);
          verifiedQty = false;
        }
        break;
      }
    }

    if (verifiedQty) {
      let newCartItem = { product, quantity };
      this.props.addToCart(newCartItem);
      this.hideAlert();
      this.handleShow(quantity);
    }
  }
  showAlert(remainingQuantityAllowed) {
    this.setState({ remainingQuantityAllowed });
    this.setState({ alert: true });
  }
  hideAlert() {
    this.setState({ alert: false });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow(quantity) {
    this.setState({ show: true, quantity });
  }
  render() {
    const product = this.props.product;
    const show = this.state.show;
    const handleClose = this.handleClose;
    return (
      <Container className="Center-column">
        <h1 className="Page-header">Single Product</h1>
        <div className="Nav-right">
          <Card border="light" className="half marg">
            <Card.Img variant="top" src={product.imgUrl} />
          </Card>
          <Card border="light marg">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <ItemQuantity
                inventory={product.inventory}
                quantity={1}
                addToCart={this.addToCart}
                type="add"
              />
              {this.state.alert && this.state.remainingQuantityAllowed >= 1 && (
                <Alert variant="danger">
                  {`That quantity is currently unavailable. Please choose ${this.state.remainingQuantityAllowed} or less.`}
                </Alert>
              )}
              {this.state.alert &&
                this.state.remainingQuantityAllowed === 0 && (
                  <Alert variant="danger">
                    {`You've already added the maximum available quantity to your bag.`}
                  </Alert>
                )}
            </Card.Body>
          </Card>
        </div>
        <Modal
          backdrop={false}
          show={show}
          onHide={handleClose}
          centered="true"
        >
          <AddedToCartModal
            product={product}
            handleClose={handleClose}
            quantity={this.state.quantity}
          />
        </Modal>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    product: state.products,
    productId: ownProps.match.params.productId,
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (productId) => dispatch(getProductById(productId)),
    addToCart: (product) => dispatch(addToCart(product)),
    getCartItems: () => dispatch(getOpenCartItemsThunk()),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

/**
 * PROP TYPES
 */
SingleProduct.propTypes = {
  product: PropTypes.object,
};
