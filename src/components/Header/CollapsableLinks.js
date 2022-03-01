import React from 'react';
import { Nav } from 'react-bootstrap';
import ShopDropdown from './ShopDropdown';
import HeaderLink from './HeaderLink';

class CollapsableLinks extends React.Component {
  render() {
    return (
      <Nav>
        {/* <ShopDropdown collapseNav={this.props.collapseNav} /> */}
        <HeaderLink
          url="/shop-all"
          pageName="Shop"
          collapseNav={this.props.collapseNav}
        />
        <HeaderLink
          url="/how-to-use"
          pageName="How To Use"
          collapseNav={this.props.collapseNav}
        />
        <HeaderLink
          url="/about"
          pageName="About"
          collapseNav={this.props.collapseNav}
        />
      </Nav>
    );
  }
}

export default CollapsableLinks;
