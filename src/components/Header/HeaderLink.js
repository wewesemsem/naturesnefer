import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderLink(props) {
  const url = props.url;
  const pageName = props.pageName;
  return (
    <Link to={url}>
      <Navbar.Text href={url} className="nav-link">
        {pageName}
      </Navbar.Text>
    </Link>
  );
}

export default HeaderLink;
