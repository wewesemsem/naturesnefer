import React from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../store/products';
import { Link } from 'react-router-dom';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    const products = this.props.products;
    if (!Array.isArray(products)) {
      return <h1>Loading</h1>;
    }
    return (
      <Container className="Center-column">
        <h1 className="Page-header">All Products</h1>
        <CardGroup>
          {products.map((product) => (
            <Card border="light" className="text-center marg">
              <Link to={'product/' + product.id}>
                <Card.Img variant="top" src={product.imgUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))}
        </CardGroup>
      </Container>
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

export default connect(mapState, mapDispatch)(AllProducts);

/**
 * PROP TYPES
 */
AllProducts.propTypes = {
  products: PropTypes.object,
};
