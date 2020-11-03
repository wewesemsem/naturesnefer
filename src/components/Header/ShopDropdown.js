import React from 'react';
import { NavDropdown } from 'react-bootstrap';

class ShopDropdown extends React.Component {
  render() {
    return (
      <NavDropdown title="Shop" id="basic-nav-dropdown">
        <NavDropdown.Item href="/shop-hair">Hair</NavDropdown.Item>
        <NavDropdown.Item href="/shop-skin">Skin</NavDropdown.Item>
        <NavDropdown.Item href="/shop-all">Shop All</NavDropdown.Item>
      </NavDropdown>
    );
  }
}

export default ShopDropdown;
