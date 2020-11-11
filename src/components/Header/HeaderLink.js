import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderLink(props) {
  const page = props.page;
  const pageName = props.pageName;
  return (
    <Link to={page}>
      <Navbar.Text href={page} className="nav-link">
        {pageName}
      </Navbar.Text>
    </Link>
  );
}

export default HeaderLink;
