import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import ShopDropdown from './ShopDropdown';
import HeaderLink from './HeaderLink';

class CollapsableLinks extends React.Component {
  render() {
    return (
      <Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <ShopDropdown />
            <HeaderLink
              collapseNav={this.collapseNav}
              page="/how-to-use"
              pageName="How To Use"
            />
            <HeaderLink
              collapseNav={this.collapseNav}
              page="/about"
              pageName="About"
            />
          </Nav>
        </Navbar.Collapse>
      </Nav>
    );
  }
}

export default CollapsableLinks;
