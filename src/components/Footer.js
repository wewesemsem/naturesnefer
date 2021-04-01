import React from 'react';
import { Navbar } from 'react-bootstrap';

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="footer">
      <Navbar.Text>© Copyright {year} - Nature's Nefer</Navbar.Text>
    </Navbar>
  );
}

export default Footer;
