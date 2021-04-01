import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllProducts } from '../../store/products';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    const products = this.props.products;
    const cartItem = this.props.cartItem;
    let imgUrl = '';
    if (products && products.length) {
      products.forEach((product) => {
        if (product.id === cartItem.productId) {
          imgUrl = product.imgUrl;
        }
      });
    }
    return (
      <ListGroup.Item>
        <div className="Nav-right">
          <img alt="" src={imgUrl} className="cart-img" /> {cartItem.name}{' '}
          {cartItem.price} {cartItem.quantity}
        </div>
      </ListGroup.Item>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
  };
};

export default connect(mapState, mapDispatch)(CartItem);

/**
 * PROP TYPES
 */
CartItem.propTypes = {
  products: PropTypes.object,
};
