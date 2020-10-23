import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import '../App.css';

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
        <Link
          to="/"
          onClick={() => {
            this.collapseNav();
          }}
        >
          <Navbar.Brand href="/">
            <img alt="" src={logo2} className="App-logo" />
            <img alt="" src={logo1} className="App-logo" />
          </Navbar.Brand>
        </Link>
      </Navbar>
    );
  }
}

export default Header;
