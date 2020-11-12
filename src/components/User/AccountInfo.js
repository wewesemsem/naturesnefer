import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

class AccountInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: [
        { name: 'Order History', url: '/order-history', eventKey: 1 },
        { name: 'My Details', url: '/my-details', eventKey: 2 },
        { name: 'Address Book', url: '/address-book', eventKey: 3 },
        { name: 'Payment Methods', url: '/payment-methods', eventKey: 4 },
      ],
    };
  }
  render() {
    const handleClick = this.props.handleClick;
    const user = this.props.user;
    const firstName = user.firstName;
    return (
      <Container className="Center-column">
        <h1 className="Page-header">Account</h1>
        <div className="Words"> Welcome to your account, {firstName}!</div>
        <Accordion className="Accordian">
          {this.state.pages.map((page) => {
            return (
              <Card key={page.eventKey}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={page.eventKey}
                  >
                    {page.name}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={page.eventKey}>
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
        <a href="/login" className="Logout" onClick={handleClick}>
          Sign Out
        </a>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountInfo);

AccountInfo.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
