import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomeButtons extends React.Component {
  render() {
    return (
      <Container className="Center-column home-btns">
        <h1 className="Page-header Home-header">Some catchy one liner.</h1>
        <Link to={'/signup'} className="Home-header">
          <Button variant="success" size="lg">
            Shop Now
          </Button>
        </Link>
      </Container>
    );
  }
}

export default HomeButtons;