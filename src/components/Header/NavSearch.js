import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavSearch(props) {
  const page = props.page;
  const pageName = props.pageName;
  const collapseNav = props.collapseNav;
  return (
    <Link
      to={page}
      onClick={() => {
        collapseNav();
      }}
    >
      <Navbar.Text href={page} class="nav-link">
        {pageName}
      </Navbar.Text>
    </Link>
  );
}

export default NavSearch;
