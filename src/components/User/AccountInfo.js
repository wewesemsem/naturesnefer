import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

class AccountInfo extends React.Component {
  render() {
    const user = this.props;
    const firstName = user.user.firstName;
    return (
      <Container className="Center-column">
        <h1 className="Page-header">Account</h1>
        <div className="Words"> Welcome to your account, {firstName}!</div>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AccountInfo);
