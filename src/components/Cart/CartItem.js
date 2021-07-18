import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllProducts } from '../../store/products';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemQuantity from './ItemQuantity';

class CartItem extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    const products = this.props.products;
    const cartItem = this.props.cartItem;
    let totalPrice = cartItem.price * cartItem.quantity;
    totalPrice = totalPrice.toFixed(2);
    let imgUrl = '';
    let inventory = 0;
    if (products && products.length) {
      products.forEach((product) => {
        if (product.id === cartItem.productId) {
          imgUrl = product.imgUrl;
          inventory = product.inventory;
        }
      });
    }
    return (
      <ListGroup.Item>
        <div className="Nav-right spc-btwn">
          <img alt="" src={imgUrl} className="cart-img" />
          <div className="Center-column">
            <h5>{cartItem.name}</h5>
            <ItemQuantity
              currentItem={cartItem}
              inventory={inventory}
              quantity={cartItem.quantity}
              type="update"
            />
            <div>${cartItem.price}</div>
            <div className="Nav-right">
              <Link className="pad1">Edit</Link>
              <Link className="pad1">Delete</Link>
            </div>
          </div>
          <div>${totalPrice}</div>
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
