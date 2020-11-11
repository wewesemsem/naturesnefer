import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import HeaderLink from './HeaderLink';

class ShopDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: [
        { url: '/shop-hair', name: 'Hair' },
        { url: '/shop-skin', name: 'Skin' },
        { url: '/shop-all', name: 'Shop All' },
      ],
    };
  }
  render() {
    return (
      <NavDropdown title="Shop" id="basic-nav-dropdown">
        {this.state.pages.map((page) => {
          return (
            <NavDropdown.Item>
              <HeaderLink url={page.url} pageName={page.name} />
            </NavDropdown.Item>
          );
        })}
      </NavDropdown>
    );
  }
}

export default ShopDropdown;
