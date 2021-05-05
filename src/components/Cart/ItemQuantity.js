import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllProducts } from '../../store/products';
import PropTypes from 'prop-types';

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
    this.state = { quantity: null };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ quantity: this.props.quantity });
  }
  componentDidUpdate(prevProps) {
    if (this.props.quantity !== prevProps.quantity) {
      this.setState({ quantity: this.props.quantity });
    }
  }
  handleChange(evt) {
    this.setState({ quantity: evt.target.value });
    if (this.props.type === 'update') {
      //make POST api call
    }
  }
  render() {
    const arr = makeArrSizeN(5);
    const type = this.props.type;
    const quantity = this.state.quantity;

    return (
      <div>
        <Form className="pad-b1">
          <Form.Control
            as="select"
            value={quantity}
            onChange={this.handleChange}
          >
            {arr.map((n) => {
              return <option>{n}</option>;
            })}
          </Form.Control>
        </Form>
        {type === 'add' && (
          <Button
            variant="success"
            onClick={(evt) => this.props.addToCart(evt, quantity)}
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
  };
};

export default connect(mapState, mapDispatch)(ItemQuantity);

/**
 * PROP TYPES
 */
ItemQuantity.propTypes = {
  products: PropTypes.object,
};
