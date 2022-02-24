import React from 'react';
import { Container } from 'react-bootstrap';
import AllProducts from './AllProducts';

class FeaturedProducts extends React.Component {
  render() {
    return (
      <Container className="Center-column">
        <h1 className="Page-header">Featured Products</h1>
        <AllProducts filter="featured" />
      </Container>
    );
  }
}

export default FeaturedProducts;
