import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllProducts } from '../../store/products';
import PropTypes from 'prop-types';
import { updateCart } from '../../store/cartItems';

const MAX_QTY_PER_ITEM = 5;

const makeArrSizeN = (n) => {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
};

class ItemQuantity extends React.Component {
  constructor() {
    super();
    this.state = { quantity: null, inventory: null, soldOut: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  componentDidMount() {
    let soldOut = false;
    if (!this.props.inventory) soldOut = true;
    this.setState({
      quantity: this.props.quantity,
      inventory: this.props.inventory,
      soldOut,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.quantity !== prevProps.quantity) {
      this.setState({ quantity: this.props.quantity });
    }
    if (this.props.inventory !== prevProps.inventory) {
      let soldOut = false;
      if (!this.props.inventory) soldOut = true;
      this.setState({ inventory: this.props.inventory, soldOut });
    }
  }
  handleChange(evt) {
    const updatedQuantity = evt.target.value;
    this.setState({ quantity: updatedQuantity });
    if (this.props.type === 'update') {
      this.props.updateCartItem(this.props.currentItem, updatedQuantity);
    }
  }
  handleClickAdd(evt) {
    this.props.addToCart(evt, this.state.quantity);
  }
  render() {
    const inventory = this.state.inventory;
    const arr = makeArrSizeN(Math.min(MAX_QTY_PER_ITEM, inventory));
    const type = this.props.type;

    return (
      <div>
        <Form className="pad-b1">
          <Form.Control
            as="select"
            value={this.state.quantity}
            onChange={this.handleChange}
          >
            {!this.state.soldOut &&
              arr.map((n) => {
                return <option>{n}</option>;
              })}
            {this.state.soldOut && <option>Sold Out</option>}
          </Form.Control>
        </Form>
        {type === 'add' && (
          <Button
            disabled={this.state.soldOut}
            variant="success"
            onClick={this.handleClickAdd}
          >
            Add to Cart
          </Button>
        )}
      </div>
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
    updateCartItem: (cartItem, quantity) =>
      dispatch(updateCart(cartItem, quantity)),
  };
};

export default connect(mapState, mapDispatch)(ItemQuantity);

/**
 * PROP TYPES
 */
ItemQuantity.propTypes = {
  products: PropTypes.object,
};
