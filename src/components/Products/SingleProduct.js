import React from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductById, addToCart } from '../../store';
import AddedToCartModal from '../Cart/AddedToCartModal';
import ItemQuantity from '../Cart/ItemQuantity';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = { show: false };
    this.handleClose = this.handleClose.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(this.props.productId);
  }
  addToCart(evt, quantity) {
    evt.preventDefault();
    let newCartItem = {product: this.props.product, quantity}
    this.props.addToCart(newCartItem);
    this.handleShow();
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
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
              <Card.Text>{product.price}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <ItemQuantity inventory={product.inventory} quantity={1} addToCart={this.addToCart} type="add"/>
            </Card.Body>
          </Card>
        </div>
        <Modal
          backdrop={false}
          show={show}
          onHide={handleClose}
          centered="true"
        >
          <AddedToCartModal handleClose={handleClose} />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (productId) => dispatch(getProductById(productId)),
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

/**
 * PROP TYPES
 */
SingleProduct.propTypes = {
  product: PropTypes.object,
};
