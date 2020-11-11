import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderLink(props) {
  const url = props.url;
  const pageName = props.pageName;
  const collapseNav = props.collapseNav;

  return (
    <Link to={url} onClick={() => collapseNav()}>
      <Navbar.Text href={url} className="nav-link">
        {pageName}
      </Navbar.Text>
    </Link>
  );
}

export default HeaderLink;
