import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserAccount from './UserAccount';
import Cart from './Cart';
import CollapsableLinks from './CollapsableLinks';
import '../../App.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { expanded: false, menuOpen: false };
    this.toggleNav = this.toggleNav.bind(this);
    this.collapseNav = this.collapseNav.bind(this);
  }
  collapseNav() {
    this.setState({ expanded: false, menuOpen: false });
  }
  toggleNav() {
    let menuOpen = !this.state.menuOpen;
    this.setState({ menuOpen });
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="md"
        expanded={this.state.expanded}
        bg="light"
        variant="light"
        fixed="top"
      >
        <div className="Header">
          <Nav>
            <Link
              to="/"
              onClick={() => {
                this.collapseNav();
              }}
            >
              <img alt="" src={logo2} className="Nav-logo" />
              <img alt="" src={logo1} className="Nav-logo" />
            </Link>
          </Nav>

          <Navbar.Toggle
            onClick={() => this.toggleNav()}
            aria-controls="responsive-navbar-nav"
            className="ml-auto"
          />

          <Nav>
            <Navbar.Collapse id="responsive-navbar-nav">
              <CollapsableLinks collapseNav={this.collapseNav} />
            </Navbar.Collapse>
          </Nav>

          <Nav>
            <div className="Nav-right">
              <SearchBar />
              <UserAccount />
              <Cart />
            </div>
          </Nav>
        </div>
        {this.state.menuOpen && (
          <div className="Menu">
            <CollapsableLinks collapseNav={this.collapseNav} />
          </div>
        )}
      </Navbar>
    );
  }
}

export default Header;
