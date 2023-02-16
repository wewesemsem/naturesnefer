import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomeButtons extends React.Component {
  render() {
    return (
      <Container className="Center-column home-btns">
        <h1 className="Page-header Home-header">
          100% natural, organic hair & skin care for all!
        </h1>
        <Link to={'/shop-all'} className="Home-header">
          <Button variant="success" size="lg">
            Shop Now
          </Button>
        </Link>
      </Container>
    );
  }
}

export default HomeButtons;
