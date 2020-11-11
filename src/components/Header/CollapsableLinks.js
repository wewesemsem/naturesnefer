import React from 'react';
import { Nav } from 'react-bootstrap';
import ShopDropdown from './ShopDropdown';
import HeaderLink from './HeaderLink';

class CollapsableLinks extends React.Component {
  render() {
    return (
      <Nav>
        <ShopDropdown />
        <HeaderLink url="/how-to-use" pageName="How To Use" />
        <HeaderLink url="/about" pageName="About" />
      </Nav>
    );
  }
}

export default CollapsableLinks;
