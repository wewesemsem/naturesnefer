import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductById, addToCart } from '../../store';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(this.props.productId);
  }
  addToCart(evt) {
    evt.preventDefault();
    this.props.addToCart(this.props.product);
  }
  render() {
    const product = this.props.product;
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
              <Button variant="success" onClick={this.addToCart}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
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
