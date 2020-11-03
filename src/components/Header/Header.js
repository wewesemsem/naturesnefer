import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import NavSearch from './NavSearch';
import NavLogin from './NavLogin';
import NavCart from './NavCart';
import ToggleDropdown from './ToggleDropdown';
import '../../App.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { expanded: false };
    this.toggleNav = this.toggleNav.bind(this);
    this.collapseNav = this.collapseNav.bind(this);
  }
  toggleNav() {
    let toggle = !this.state.expanded;
    this.setState({ expanded: toggle });
  }
  collapseNav() {
    this.setState({ expanded: false });
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="md"
        expanded={this.state.expanded}
        bg="clear"
        variant="light"
        sticky="top"
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

          <ToggleDropdown />

          <Nav>
            <div className="Nav-right">
              <NavSearch />
              <NavLogin />
              <NavCart />
            </div>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

export default Header;
