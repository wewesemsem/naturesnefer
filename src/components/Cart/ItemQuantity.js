import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllProducts } from '../../store/products';
import PropTypes from 'prop-types';

const makeArrSizeN = (n) => {
  let arr = [];
  for (let i = 1; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

class ItemQuantity extends React.Component {
  render() {
    const inventory = this.props.inventory;
    const arr = makeArrSizeN(inventory);
    return (
      <Form>
        <Form.Control as="select" value={this.props.quantity}>
          {arr.map((n) => {
            return <option>{n}</option>;
          })}
        </Form.Control>
      </Form>
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

export default connect(mapState, mapDispatch)(ItemQuantity);

/**
 * PROP TYPES
 */
ItemQuantity.propTypes = {
  products: PropTypes.object,
};
