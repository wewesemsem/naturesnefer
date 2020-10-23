import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import '../App.css';

class NavBar extends React.Component {
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
        <Link
          to="/home"
          onClick={() => {
            this.collapseNav();
          }}
        >
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={logo}
              width="60"
              height="60"
              className="App-logo"
            />{' '}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          onClick={() => this.toggleNav()}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              to="/aboutMe"
              onClick={() => {
                this.collapseNav();
              }}
            >
              <Navbar.Text href="/aboutMe" class="nav-link">
                About Me
              </Navbar.Text>
            </Link>
            <Link
              to="/portfolio"
              onClick={() => {
                this.collapseNav();
              }}
            >
              <Navbar.Text href="/portfolio" class="nav-link">
                Portfolio
              </Navbar.Text>
            </Link>
          </Nav>
          <Nav>
            <Link
              to="/contact"
              onClick={() => {
                this.collapseNav();
              }}
            >
              <Navbar.Text href="/contact" class="nav-link">
                Contact
              </Navbar.Text>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
