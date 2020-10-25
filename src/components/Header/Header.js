import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import NavSearch from './NavSearch';
import NavLogin from './NavLogin';
import NavCart from './NavCart';
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
        expand="lg"
        expanded={this.state.expanded}
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container className="Header">
          <Nav>
            <Link
              to="/"
              onClick={() => {
                this.collapseNav();
              }}
            >
              <Navbar.Brand href="/">
                <img alt="" src={logo2} width="60" height="60" />
                <img alt="" src={logo1} width="60" height="60" />
              </Navbar.Brand>
            </Link>
          </Nav>

          <Nav className="Toggle">
            <Navbar.Toggle
              onClick={() => this.toggleNav()}
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Shop" id="basic-nav-dropdown" drop="down">
                  <NavDropdown.Item href="/shop-hair">Hair</NavDropdown.Item>
                  <NavDropdown.Item href="/shop-skin">Skin</NavDropdown.Item>
                  <NavDropdown.Item href="/shop-all">Shop All</NavDropdown.Item>
                </NavDropdown>
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

          <Nav className="Nav-right">
            <NavSearch />
            <NavLogin />
            <NavCart />
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
